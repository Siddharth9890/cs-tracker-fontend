import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { HEADER, NAV } from "./config-layout";

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
        py: `${HEADER.H_MOBILE + 8}px`,
      }}
    >
      {children}
    </Box>
  );
}
