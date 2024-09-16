import { Box } from "@mui/material";
import React from "react";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#161C24",
      }}
    >
      {children}
    </Box>
  );
}
