import React from 'react';
import { Input } from "/components//input";
import { Label } from "@/components/ui/label";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
}