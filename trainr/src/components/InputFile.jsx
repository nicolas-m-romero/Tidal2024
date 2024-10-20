import React, { useState } from 'react';
import { Input } from "./Input";

export function InputFile({ onFileSelect }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      if (onFileSelect) {
        onFileSelect(selectedFile, selectedFile.name);
      }
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input 
        id="picture" 
        type="file" 
        onChange={handleFileChange}
      />
      {fileName && (
        <p className="text-sm text-gray-500">
          Selected file: {fileName}
        </p>
      )}
    </div>
  );
}