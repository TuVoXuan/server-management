import { DatePicker } from "@/components/ui/date-picker";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  from: yup.date().required(),
  to: yup
    .date()
    .required("To is required")
    .min(yup.ref("from"), "'To' date must be greater than 'From' date"),
});

export default function CustomRangePicker() {
  const { control, watch, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const from = watch("from");

  useEffect(() => {
    if (from) {
      trigger("to");
    }
  }, [from, trigger]);

  return (
    <div className="xl:flex xl:items-end xl:gap-x-2">
      <div className="flex items-start gap-x-2">
        <Controller
          control={control}
          name="from"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              label="From"
              value={value}
              onValueChange={onChange}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="to"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              label="To"
              value={value}
              onValueChange={onChange}
              helperText={error?.message}
            />
          )}
        />
      </div>
      <Button className="w-full mt-2 xl:w-25">Apply</Button>
    </div>
  );
}
