import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

export function ActivitySelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Activity" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Low">Running</SelectItem>
        <SelectItem value="Medium">Basketball</SelectItem>
        <SelectItem value="High">Bouldering</SelectItem>
      </SelectContent>
    </Select>
  );
}