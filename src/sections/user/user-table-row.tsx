import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ListItemText from "@mui/material/ListItemText";
import Label from "src/components/label/label";

export default function UserTableRow({ row, selected }: any) {
  const { name, avatarUrl, company, role, status, email, phoneNumber } = row;

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: "pointer" }}>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{company}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === "active" && "success") ||
              (status === "pending" && "warning") ||
              (status === "banned" && "error") ||
              "default"
            }
          >
            {status}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
