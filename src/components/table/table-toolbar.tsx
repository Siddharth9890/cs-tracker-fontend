import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

type Props = {
  filterRole: string;
  onFilterRole: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  optionsRole: string[];
  name: string;
};

export default function TableToolbar({
  filterRole,
  name,
  onFilterRole,
  optionsRole,
}: Props) {
  return (
    <>
      <TextField
        fullWidth
        select
        label={name}
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: "capitalize",
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
