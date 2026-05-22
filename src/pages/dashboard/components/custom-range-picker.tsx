import { DatePicker } from "@/components/ui/date-picker";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  value?: { from: Date; to: Date };
  onApplyFilter: (dateRange: { from: Date; to: Date }) => void;
}

const schema = yup.object().shape({
  from: yup.date().required("From is required"),
  to: yup
    .date()
    .required("To is required")
    .min(yup.ref("from"), "'To' date must be greater than 'From' date"),
});

type FormData = yup.InferType<typeof schema>;

export default function CustomRangePicker({ onApplyFilter, value }: Props) {
  const { control, watch, trigger, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const from = watch("from");

  useEffect(() => {
    if (from) {
      trigger("to");
    }
  }, [from, trigger]);

  useEffect(() => {
    reset({ from: value?.from, to: value?.to });
  }, [value]);

  function onSubmit(value: FormData) {
    onApplyFilter(value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
      <Button type="submit" className="w-full mt-2 xl:w-25">
        Apply
      </Button>
    </form>
  );
}
