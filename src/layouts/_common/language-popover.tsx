import { useCallback } from "react";
import { m } from "framer-motion";
// @mui
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// locales
// components
import Iconify from "src/components/iconify";
import { varHover } from "src/components/animate/variants/actions";
import CustomPopover from "src/components/custom-popver/custom-popover";
import usePopover from "src/components/custom-popver/use-popover";

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const popover = usePopover();

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...(popover.open && {
            bgcolor: "action.selected",
          }),
        }}
      ></IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 160 }}
      ></CustomPopover>
    </>
  );
}
