import { Question } from "@/types";
import {
  Avatar,
  TableRow,
  Checkbox,
  TableCell,
  ListItemText,
} from "@mui/material";

type Props = {
  selected: boolean;
  row: Question;
  onSelectRow: VoidFunction;
};

export default function QuestionTableRow({
  row,
  selected,
  onSelectRow,
}: Props) {
  const { name, bookMark, link, note, revisionDate } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

          <ListItemText
            primary={name}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{bookMark}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{link}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{note}</TableCell>
      </TableRow>
    </>
  );
}
