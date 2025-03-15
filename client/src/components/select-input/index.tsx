import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"


export interface SelectInputProps {
  placeholder: string
  options: string[];
}

export function SelectInput({
  placeholder,
  options
}: SelectInputProps) {
  return (
    <Select>
      <SelectTrigger className="w-[321px] bg-[#F5F5F5] border-color-[#484848] ocus:border-transparent focus:ring-0 text-black">
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent>
      <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
