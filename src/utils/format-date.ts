import { format } from "date-fns";

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue) {
  const fm = "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}
