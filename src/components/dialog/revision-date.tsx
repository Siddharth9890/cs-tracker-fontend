import { QuestionMeta } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onUpdatedRow: (question: QuestionMeta) => void;
  row: QuestionMeta;
};

export default function RevisionDate({
  open,
  onClose,
  onUpdatedRow,
  row,
}: Props) {
  const [revisionDate, setRevisionDate] = useState(
    row.revisionDate === null ? new Date() : row.revisionDate
  );

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { maxWidth: 450, bgcolor: "#212B36" },
        }}
      >
        <>
          <DialogTitle>Select Revision Date</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                minDate={dayjs()}
                value={dayjs(revisionDate)}
                onChange={(newValue) => setRevisionDate(newValue)}
              />
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                onUpdatedRow({ ...row, revisionDate });
                onClose();
              }}
            >
              Submit
            </Button>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}
