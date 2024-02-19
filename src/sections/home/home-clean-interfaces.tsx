import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// components
import Image from "src/components/image/image";
import MotionViewport from "src/components/animate/motion-viewport";
import { varFade } from "src/components/animate/variants/fade";
// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  const renderDescription = (
    <Stack
      spacing={3}
      sx={{
        my: -10,
        maxWidth: 520,
        mx: "auto",
        zIndex: { md: 99 },
        position: { md: "absolute" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            textShadow: (theme) =>
              theme.palette.mode === "light"
                ? "unset"
                : `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
          }}
        >
          Start your journey today!
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      {renderDescription}
    </Container>
  );
}
