import { Theme, SxProps } from "@mui/material/styles";
import { TableRow, TableHead, TableCell } from "@mui/material";

type Props = {
  headLabel: {
    id: string;
    label: string;
  }[];
  sx?: SxProps<Theme>;
};

export function TableHeadCustom({ headLabel, sx }: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={"left"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
