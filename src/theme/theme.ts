"use client";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: { mode: "light" },
  shape: {
    borderRadius: 16,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#161C24" },
  },
  shape: {
    borderRadius: 16,
  },
});
