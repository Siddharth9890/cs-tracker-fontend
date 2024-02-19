import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// components
import MotionViewport from "src/components/animate/motion-viewport";
import { varFade } from "src/components/animate/variants/fade";
// ----------------------------------------------------------------------

const CARDS = [
  {
    title: "Select Problems",
    description: "Select one out of many problems from our platform.",
  },
  {
    title: "Solve Problems",
    description: "Solve in on leetcode and pass it against all test cases!",
  },
  {
    title: "Revise",
    description:
      "After solving add the problem in your revision list. Thereby ensuring you dont forgot the logic",
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: "center",
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography
            component="div"
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            CS TRACKER
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            Why Cs Tracker <br /> helps you?
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {CARDS.map((card, index) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: "center",
                boxShadow: { md: "none" },
                bgcolor: "background.default",
                p: (theme) => theme.spacing(10, 5),
                ...(index === 1 && {
                  boxShadow: (theme) => ({
                    md: `-40px 40px 80px ${
                      theme.palette.mode === "light"
                        ? alpha(theme.palette.grey[500], 0.16)
                        : alpha(theme.palette.common.black, 0.4)
                    }`,
                  }),
                }),
              }}
            >
              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {card.description}
              </Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
