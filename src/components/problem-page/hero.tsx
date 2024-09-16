import { Stack, Container, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Container
      sx={{
        display: { md: "flex" },
        justifyContent: { md: "space-between" },
        padding: 1,
        mt: 4,
      }}
    >
      <Stack spacing={3}>
        <>
          <Typography variant="h3" component="h1">
            The Problem
          </Typography>
        </>

        <Typography sx={{ color: "text.secondary" }}>
          It is common to solve problems on LeetCode or jot down key concepts for
          interviews, but we often forget to revise them.
          <br /> Regular revision is crucial to reinforce your understanding and
          ensure you are fully prepared when it matters most.
          <br /> This project is in POC stage.
        </Typography>
      </Stack>
    </Container>
  );
}
