import { format, formatDistanceToNow } from "date-fns";

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue) {
  const fm = "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
