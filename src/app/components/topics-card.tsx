"use client";
import { Box, Card, Stack, ListItemText } from "@mui/material";
import { Topic } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  topics: Topic[];
};

export default function TopicDetails({ topics }: Props) {
  const router = useRouter();


  

  return (
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
          sx={{ p: 3 }}
          onClick={() =>
            router.push(`/a2z/${topic.title}`.toLowerCase().replace(/\s+/g, "-"))
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
  );
}
