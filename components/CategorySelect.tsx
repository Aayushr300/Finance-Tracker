'use client';

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type CategorySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const categories = [
  "Food",
  "Rent",
  "Shopping",
  "Salary",
  "Entertainment",
  "Utilities",
  "Transport",
  "Others",
];

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="">
      <Label htmlFor="category">Category</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
