from flask import Flask, request, jsonify, send_file
import openai
from dotenv import load_dotenv
import os
import shutil
from langchain.document_loaders import DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma

import cv2
from ultralytics import YOLO
import numpy as np
import csv
from flask_cors import CORS

import pandas as pd
import numpy as np
from scipy.signal import find_peaks

#Reference to https://www.youtube.com/watch?v=tcqEUSNCn8I
load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")
CHROMA_PATH = "chroma"
PROMPT_TEMPLATE = """
Use the following context for reference:

{context}

---

Can you generate a workout plan for 7 days using this context: {question}.

It should be in JSON format with the name of the day (Day 1, Day 2, Day 3, etc...) as the keys and the workout plan as the values. The values should be a list of exercies with their sets, reps, rest, and weights (exercise : exercise_name, sets : number_of_sets, reps : number_of_reps, rest : time_to_rest, weight : weight_amount)."
Only return the JSON with all keys and values as strings.
"""

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/query")
def query():

    def generate_data_store():
        documents = load_documents()
        chunks = split_text(documents)
        save_to_chroma(chunks)

    def load_documents():
        loader = DirectoryLoader("research", glob="*.txt")
        return loader.load()
    
    def split_text(documents: list[Document]):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=100,
            length_function=len,
            add_start_index=True,
        )
        chunks = text_splitter.split_documents(documents)
        print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

        return chunks

    def save_to_chroma(chunks: list[Document]):
        if os.path.exists(CHROMA_PATH):
            shutil.rmtree(CHROMA_PATH)

        db = Chroma.from_documents(
            chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH
        )
        db.persist()
        print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")

    generate_data_store()
    return "<p>Query Worked PogU</p>" 

@app.route("/retrieve", methods=["GET"])
def retrieve():
    query_text = request.args.get("query")
    
    if not query_text:
        return jsonify({"error": "Query parameter is required"}), 400
    
    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7:
        print(f"Unable to find matching results.")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = ChatOpenAI(
        model="gpt-4-turbo",
        model_kwargs={"response_format": {"type": "json_object"}},
)
    response_text = model.predict(prompt)

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    # print(formatted_response)
    print("Got Here")
    print("Response", formatted_response)
    return jsonify({"Response":response_text, "Sources":sources}) 

@app.route("/cv/<path:video_path>", methods=["GET"])
def cv(video_path):
    model = YOLO("yolov8n-pose.pt")
    cap = cv2.VideoCapture(video_path)

    # get video properties
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    # define the code and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_file = 'output.mp4'  # Output video file path
    out = cv2.VideoWriter(output_file, fourcc, fps, (frame_width, frame_height))

    frame_count = 0
    all_frames_data = []

    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            results = model(frame, verbose=False)

            annotated_frame = results[0].plot()

            # write the frame to the output video
            out.write(annotated_frame)

            # extract keypoints
            keypoints = results[0].keypoints.cpu().numpy()
            
            if len(keypoints) > 0:
                print(f"Running Frame {frame_count}")
                frame_data = [frame_count]
                for person_idx, person_keypoints in enumerate(keypoints):
                    # iterates through all keypoints and prints if confident
                    for i, kp in enumerate(person_keypoints.data[0]):
                        x, y, conf = kp[0], kp[1], kp[2]
                        if conf > 0:  # only print keypoints that are detected
                            frame_data.extend([round(x, 2), round(y, 2), round(conf, 2)])
                all_frames_data.append(frame_data)

            # for visual purposes only
            #cv2.imshow("YOLOv8", annotated_frame)

            # how to break/end if needed
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

            frame_count += 1
        else:
            break

    # release everything when the job is finished
    cap.release()
    out.release()
    cv2.destroyAllWindows()

    # write data to CSV
    with open('pose_keypoints.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        # write header
        header = ['frame']
        for i in range(17):  # 17 keypoints
            header.extend([f'kp{i}_x', f'kp{i}_y', f'kp{i}_conf'])
        writer.writerow(header)
        
        # write data
        writer.writerows(all_frames_data)

    if os.path.exists(output_file):
        return send_file(output_file, as_attachment=True)
    else:
        return jsonify({"error": "Output file not found"}), 404

@app.route("/score/<path:comparison_csv>", methods=["GET"])
def scoreCV(comparison_csv):
    def calculate_angle(a, b, c):
        # calculate the angle between three points
        ba = a - b
        bc = c - b
        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        angle = np.arccos(cosine_angle)
        return np.degrees(angle)

    def calculate_torque(shoulder_left, shoulder_right, hip_left, hip_right):
        # approximate torque based on the twist of shoulders relative to hips
        shoulder_vector = shoulder_right - shoulder_left
        hip_vector = hip_right - hip_left
        return np.cross(shoulder_vector, hip_vector)

    def get_keypoint(row, kp_num):
        # extract x, y coordinates for a given keypoint
        return np.array([row[f'kp{kp_num}_x'], row[f'kp{kp_num}_y']])

    def analyze_pose(df):
        # analyze pose data for a single runner
        results = []
        for _, row in df.iterrows():
            # calculate leg angles
            left_leg_angle = calculate_angle(get_keypoint(row, 11), get_keypoint(row, 12), get_keypoint(row, 13))
            right_leg_angle = calculate_angle(get_keypoint(row, 8), get_keypoint(row, 9), get_keypoint(row, 10))
            
            # calculate arm angles
            left_arm_angle = calculate_angle(get_keypoint(row, 5), get_keypoint(row, 6), get_keypoint(row, 7))
            right_arm_angle = calculate_angle(get_keypoint(row, 2), get_keypoint(row, 3), get_keypoint(row, 4))
            
            # approximate torque
            torque = calculate_torque(get_keypoint(row, 5), get_keypoint(row, 2), get_keypoint(row, 11), get_keypoint(row, 8))
            
            results.append({
                'left_leg_angle': left_leg_angle,
                'right_leg_angle': right_leg_angle,
                'left_arm_angle': left_arm_angle,
                'right_arm_angle': right_arm_angle,
                'torque': np.linalg.norm(torque)
            })
        
        return pd.DataFrame(results)

    # perfect runner form data
    perfect_csv = 'perfect_runner.csv'

    perfect_df = pd.read_csv(perfect_csv)
    comparison_df = pd.read_csv(comparison_csv)
    
    perfect_analysis = analyze_pose(perfect_df)
    comparison_analysis = analyze_pose(comparison_df)
    
    # ensure both analyses have the same number of frames
    min_frames = min(len(perfect_analysis), len(comparison_analysis))
    perfect_analysis = perfect_analysis.iloc[:min_frames]
    comparison_analysis = comparison_analysis.iloc[:min_frames]
    
    # calculate differences
    diff_df = perfect_analysis - comparison_analysis
    diff_df = diff_df.abs()
    
    # score each aspect (lower difference better)
    max_angle_diff = 180  # max possible angle difference
    max_torque_diff = diff_df['torque'].max()  # max observed difference for torque
    
    angle_score = 100 - (diff_df[['left_leg_angle', 'right_leg_angle', 'left_arm_angle', 'right_arm_angle']].mean().mean() / max_angle_diff * 100)
    torque_score = 100 - (diff_df['torque'].mean() / max_torque_diff * 100)
    
    # calculate overall score (average of angle and torque scores)
    overall_score = (angle_score + torque_score) / 2
    
    return str(max(0, min(100, overall_score)))  # ensure score is between 0 and 100

if __name__ == '__main__':
    app.run(debug=True)