import { QuestionMeta } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onUpdatedRow: (question: QuestionMeta) => void;
  value: string;
};

export default function Notes({ open, onClose, onUpdatedRow, value }: Props) {
  const [note, setNote] = useState(value);

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
          <DialogTitle>Add Notes</DialogTitle>
          <DialogContent>
            <TextField
              label="Notes"
              multiline
              minRows={6}
              value={value}
              onChange={(e) => setNote(e.target.value)}
              sx={{ width: "100%", mt: 1 }}
            />
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
