"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface Props {
  value: Date | undefined;
  onValueChange: (value: Date | undefined) => void;
  label?: string;
  helperText?: string;
}

export function DatePicker({ value, onValueChange, label, helperText }: Props) {
  return (
    <Field className="mx-auto w-44">
      {label && <FieldLabel htmlFor="date-picker-simple">{label}</FieldLabel>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            <CalendarIcon />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onValueChange}
            defaultMonth={value}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {helperText && <p className="text-red-500 text-xs">{helperText}</p>}
    </Field>
  );
}
