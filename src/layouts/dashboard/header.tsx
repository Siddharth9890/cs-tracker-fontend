// @mui
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// theme
import { bgBlur } from "src/theme/css";
// hooks
import { useOffSetTop } from "src/hooks/user-off-set-top";
import { useResponsive } from "src/hooks/use-responsive";
// components
import Logo from "src/components/logo";
import { useSettingsContext } from "src/components/settings/context/settings-context";
//
import { HEADER, NAV } from "../config-layout";
import { Button } from "@mui/material";

export default function Header() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === "horizontal";

  const isNavMini = settings.themeLayout === "mini";

  const lgUp = useResponsive("up", "lg");

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      <Logo sx={{ mr: 2.5 }} />

      <Stack direction={"row"} justifyContent={"center"} flex={1}>
        <Button>Explore</Button>
        <Button>Profile</Button>
        <Button>Revision</Button>
      </Stack>
      <Button>Sign In</Button>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `100%`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
