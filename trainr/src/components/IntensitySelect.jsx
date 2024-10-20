import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

export function IntensitySelect() {
  const [intensity, setIntensity] = useState(''); // State to store selected value

  const handleChange = (value) => {
    setIntensity(value); // Update the state with the selected value
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Intensity" />
      </SelectTrigger>
      <SelectContent className="bg-white bg-opacity-100"> 
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
      </SelectContent>
    </Select>
  );
}