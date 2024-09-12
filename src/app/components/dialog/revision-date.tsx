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
};

export default function RevisionDate({ open, onClose }: Props) {
  const [revisionDate, setRevisionDate] = useState(new Date());

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { maxWidth: 450 },
        }}
      >
        <>
          <DialogTitle>Select Revision Date</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                minDate={dayjs()}
                value={revisionDate}
                onChange={(newValue) => setRevisionDate(newValue)}
              />
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={onClose}>
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
