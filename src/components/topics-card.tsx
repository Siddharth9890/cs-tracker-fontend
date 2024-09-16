"use client";
import { Box, Card, Stack, ListItemText, Typography } from "@mui/material";
import { Topic } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  topics: Topic[];
};

export default function TopicDetails({ topics }: Props) {
  const router = useRouter();

  return (
    <>
      <Stack direction="column" gap={2} alignItems="center">
        <Typography variant="h5" sx={{ pb: 5, pt: 3 }} alignContent={"center"}>
          NeetCode 150 DSA Sheet
        </Typography>
      </Stack>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {topics.map((topic, index) => (
          <Stack
            component={Card}
            direction="row"
            spacing={2}
            key={index}
            sx={{ p: 3, bgcolor: "#212B36" }}
            onClick={() =>
              router.push(
                `/neetcode150/${topic.title}`.toLowerCase().replace(/\s+/g, "-")
              )
            }
          >
            <Stack spacing={2}>
              <ListItemText
                primary={topic.title}
                secondary={topic.description}
                secondaryTypographyProps={{
                  mt: 0.5,
                  component: "span",
                  typography: "caption",
                  color: "text.disabled",
                }}
              />
            </Stack>
          </Stack>
        ))}
      </Box>
    </>
  );
}
