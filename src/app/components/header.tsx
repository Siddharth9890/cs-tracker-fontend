import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function LayoutHeader() {
  return (
    <Container component="header" sx={{ py: 4 }}>
      <Stack direction={"row"}>
        <Button>Home</Button>
        <Button>Home</Button>
        <Button>Home</Button>
      </Stack>
      <Stack direction="column" gap={2} alignItems="center">
        <Typography variant="h5" pt={1.4} alignContent={"center"}>
          A2Z DSA TRACKER
        </Typography>
        <Typography variant="body1" pt={1.4} alignContent={"center"}>
          Learn DSA from scratch
        </Typography>
      </Stack>
    </Container>
  );
}
