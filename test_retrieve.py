import requests
import json

def test_retrieve_endpoint(query):
    url = f"http://127.0.0.1:5000/retrieve?query={query}"
    try:
        response = requests.get(url)
        # print("RESPONSE hello", response)
        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.json().get('error')}")
            return
        data = response.json()
        # print("ADADFAFADFADF", data)
        validate_response_format(data)

    except Exception as e:
        print(f"Network error: {e}")

def validate_response_format(data):
    # Check if the response is a dictionary
    if not isinstance(data, dict):
        print("Response is not a valid JSON object.")
        return
    print(type(json.loads(data['Response'])), json.loads(data['Response']))
    # Define expected structure
    expected_keys = [f"day{i}" for i in range(1, 8)]  # For example: day1, day2, ..., day7
    for key in expected_keys:
        if key not in json.loads(data['Response']):
            print(f"Missing key: {key}")
            return

        # Check if each day's value is a list
        exercises = json.loads(data['Response'])[key]
        if not isinstance(exercises, list):
            print(f"Value for {key} is not a list.")
            return

        for exercise in exercises:
            if not validate_exercise_structure(exercise):
                return

    print("Response format is valid:", data)

def validate_exercise_structure(exercise):
    expected_structure = {
        "exercise": str,
        "sets": str,
        "reps": str,
        "rest": str,  # Assuming rest is in minutes or seconds
        "weight": str,  # Assuming weight is a number
    }

    # Check if the exercise is a dictionary
    if not isinstance(exercise, dict):
        print("Exercise is not a valid JSON object.")
        return False

    # Check for required keys and their types
    for key, expected_type in expected_structure.items():
        if key not in exercise or not isinstance(exercise[key], expected_type):
            print(f"Invalid structure for exercise: {exercise}")
            return False

    return True

# Example usage: replace 'your_search_term' with an actual query term
test_retrieve_endpoint('workout plan')
