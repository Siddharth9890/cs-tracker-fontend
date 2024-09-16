import Link from "next/link";
import { TableRow, Checkbox, TableCell, ListItemText } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LaunchIcon from "@mui/icons-material/Launch";

import { QuestionMeta } from "@/types";
import { fDate } from "@/utils/format-date";
import { useBoolean } from "@/hooks/use-boolean";
import Notes from "../dialog/notes";
import RevisionDate from "../dialog/revision-date";

type Props = {
  row: QuestionMeta;
  onUpdatedRow: (question: QuestionMeta) => void;
  sheetName: string;
};

export default function QuestionTableRow({
  row,
  onUpdatedRow,
  sheetName,
}: Props) {
  const { question, isBookMark, note, revisionDate, checked } = row;
  const { id, name, solutionLink, solvingLink } = question;

  const notesDialog = useBoolean();
  const revisionDateDialog = useBoolean();

  const updateProgress = (checked: boolean) => {
    const item = localStorage.getItem(sheetName);
    if (item === null) {
      localStorage.setItem(
        sheetName,
        JSON.stringify({ currentProgress: 0, totalQuestions: 443 })
      );
    } else {
      let { currentProgress, totalQuestions } = JSON.parse(item);
      if (!checked) currentProgress += 1;
      else currentProgress -= 1;
      localStorage.setItem(
        sheetName,
        JSON.stringify({ currentProgress, totalQuestions })
      );
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell padding="checkbox">
          <Checkbox
            checked={checked}
            onClick={() => {
              updateProgress(checked);
              onUpdatedRow({ ...row, checked: !row.checked });
            }}
          />
        </TableCell>

        <TableCell sx={{ alignItems: "center" }}>
          <ListItemText
            primary={name}
            primaryTypographyProps={{ typography: "body2" }}
            sx={{ textDecoration: checked ? "line-through" : "none" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          <Link
            target="_blank"
            passHref
            href={solvingLink}
            style={{ textDecoration: "none" }}
          >
            <LaunchIcon
              sx={{
                color: "text.disabled",
                fontSize: "body2.fontSize",
                position: "relative",
                top: 3.5,
                left: 8,
              }}
            />
          </Link>
        </TableCell>

        <TableCell
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => notesDialog.onToggle()}
        >
          {note.length === 0 ? (
            <NoteAddOutlinedIcon />
          ) : (
            <EditNoteOutlinedIcon />
          )}
        </TableCell>

        <TableCell
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => onUpdatedRow({ ...row, isBookMark: !row.isBookMark })}
        >
          {isBookMark ? (
            <BookmarkOutlinedIcon />
          ) : (
            <BookmarkBorderOutlinedIcon />
          )}
        </TableCell>

        <TableCell
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => revisionDateDialog.onToggle()}
        >
          {revisionDate === null ? "-" : fDate(revisionDate)}
        </TableCell>
      </TableRow>
      <Notes
        onClose={notesDialog.onFalse}
        open={notesDialog.value}
        onUpdatedRow={onUpdatedRow}
        row={row}
      />
      <RevisionDate
        onClose={revisionDateDialog.onFalse}
        open={revisionDateDialog.value}
        onUpdatedRow={onUpdatedRow}
        row={row}
      />
    </>
  );
}
