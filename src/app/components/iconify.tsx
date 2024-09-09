import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";
//

/* eslint-disable react/display-name */
const Iconify = forwardRef<SVGElement, any>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
