import { Stack, Divider, Container, Typography } from "@mui/material";

import ComponentHero from "./hero";

export default function ProblemPage() {
  return (
    <>
      <ComponentHero />

      <Container sx={{ pt: 10, pb: 15 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">The Solution</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Introducing CS-Tracker, a web app designed to help you stay on top
              of your interview prep. Track your solved questions, set revision
              dates, and easily revisit important concepts when needed.
              <br /> The app also features:
              <br />
              1) Custom problem sheets (coming soon). <br /> 2) A reading list
              for key concepts (coming soon). <br /> 3) A dedicated revision tab
              (coming soon). <br /> All this directly in your browser—no login
              required!
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed", my: 8 }} />

        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">Custom Problem Sheet</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Create your own custom problem sets using our simple JSON format.
              Whether it is LeetCode problems or topics like OS and DBMS, tailor
              the list to fit your learning goals and keep track of what matters
              most for your next interview!.
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed", my: 8 }} />

        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">Reading List</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Avoid the clutter of bookmarking endless resources. Instead, add
              them to your personalized reading list with a scheduled date to
              review. Once you are done, simply archive the content, ensuring you
              stay organized and up-to-date with essential concepts.
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed", my: 8 }} />

        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">Revision Tab</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              All questions with a revision date from your custom sheets are
              gathered here, making it easy to find and review them. Stay
              organized and reduce the stress of tracking down what needs to be
              revised.
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed", my: 8 }} />

        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h5">
              Private, Organized Interview Prep, All in Your Browser
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              All this works locally in your browser, ensuring your data stays
              private—no tracking, no servers involved. Plus, it is completely
              free! Enjoy a seamless, secure experience while managing your
              interview prep.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
