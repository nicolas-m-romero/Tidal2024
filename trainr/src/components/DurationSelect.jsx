import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

export function DurationSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="30">30 minutes</SelectItem>
        <SelectItem value="45">45 minutes</SelectItem>
        <SelectItem value="60">60 minutes</SelectItem>
        <SelectItem value="75">75 minutes</SelectItem>
        <SelectItem value="90">90 minutes</SelectItem>
      </SelectContent>
    </Select>
  );
}
