import type { Metadata } from "next";

import { darkTheme } from "@/theme/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import LayoutHeader from "../components/header";
import Main from "../components/main";

export const metadata: Metadata = {
  title: "CS-Tracker: Private, Organized Interview Prep, All in Your Browser",
  description:
    "CS-Tracker: Private, Organized Interview Prep, All in Your Browser",
  authors: [{ name: "Siddharth Singh", url: "https://siddharth9890.com/" }],
  keywords: [
    "Interview Prep Tool",
    "Coding Practice Tracker",
    "LeetCode Question Tracker",
    "Custom Problem Sheets",
    "Revision Management Tool",
    "Programming Study Planner",
    "Free Coding Tracker",
    "Secure Browser-Based Prep",
    "Personalized Reading List",
    "Local Data Privacy",
    "CS Interview Preparation",
    "Web App for Coding Questions",
    "Track Coding Problems",
    "Organize Programming Concepts",
    "Efficient Revision System",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://cs-tracker.vercel.app",
    title: "CS-Tracker",
    description:
      "CS-Tracker: Private, Organized Interview Prep, All in Your Browser",
    siteName: "CS-Tracker",
    images: "https://cs-tracker.vercel.app/assets/logo.webp",
  },
  creator: "Siddharth9890",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <LayoutHeader />
          <Container component="main">
            <Main>{children}</Main>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
