// @mui
import Box from "@mui/material/Box";
//
import Main from "./main";
import Header from "./header";

import Footer from "../main/footer";

export default function DashboardLayout({ children }: any) {
  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Main>{children}</Main>
      </Box>
      <Footer />
    </>
  );
}
