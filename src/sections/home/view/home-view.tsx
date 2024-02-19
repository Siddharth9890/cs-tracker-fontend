import { useScroll } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// components
import ScrollProgress from "src/components/scroll-progress";
//
import HomeHero from "../home-hero";
import HomeMinimal from "../home-minimal";
import HomeCleanInterfaces from "../home-clean-interfaces";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />

      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          bgcolor: "background.default",
        }}
      >
        <HomeMinimal />

        <HomeCleanInterfaces />
      </Box>
    </>
  );
}
