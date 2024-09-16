import { Stack, Typography } from "@mui/material";

export default function ComingSoon() {
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ mt: "10%" }}
    >
      <Typography variant="h4">Coming Soon!</Typography>

      <Typography sx={{ color: "text.secondary", mt: 2 }}>
        We are currently working hard on this page!
      </Typography>
    </Stack>
  );
}
