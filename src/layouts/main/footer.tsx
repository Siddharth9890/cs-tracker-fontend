// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// routes
import { paths } from "src/routes/paths";

const LINKS = [
  {
    headline: "Backend Code",
    children: [
      { name: "About us", href: paths.about },
      { name: "Contact us", href: paths.contact },
      { name: "FAQs", href: paths.faqs },
    ],
  },
  {
    headline: "Frontend Code",
    children: [
      { name: "Terms and Condition", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [{ name: "support@minimals.cc", href: "#" }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Grid
          container
          justifyContent={{
            xs: "center",
            md: "space-between",
          }}
        >
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: "auto", md: "unset" },
              }}
            >
              The starting point for your next project with Minimal UI Kit,
              built on the newest version of Material-UI ©, ready to be
              customized to your style.
            </Typography>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 5 }}>
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
