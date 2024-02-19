// @mui
import { Theme, SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
// routes
import { RouterLink } from "../../routes/components/router-link";
// config
import { ROOTS } from "src/routes/paths";

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button
      component={RouterLink}
      href={ROOTS.DASHBOARD}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}
