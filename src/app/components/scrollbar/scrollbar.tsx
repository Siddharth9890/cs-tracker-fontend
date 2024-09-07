import { memo, forwardRef } from "react";
// @mui
import Box from "@mui/material/Box";
//
import { StyledRootScrollbar, StyledScrollbar } from "./styles";

// ----------------------------------------------------------------------

// @es-lint
const Scrollbar = forwardRef<HTMLDivElement, any>(
  ({ children, sx, ...other }, ref) => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (isMobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);

export default memo(Scrollbar);
