import { PageWithParams, Topic } from "@/types";
import TopicListView from "../../../components/topic-list-view";
import { fetchFile } from "@/lib/fetch";
import { Stack, Typography } from "@mui/material";

type Props = PageWithParams<{ topic: string; sheetName: string }>;

export default async function QuestionsPage({ params }: Props) {
  const topics: Topic[] = await fetchFile();

  const topic = topics.find(
    (topic) => topic.title.toLowerCase().replace(/\s+/g, "-") === params.topic
  );

  return (
    <>
      <Stack direction="column" gap={2} alignItems="center">
        <Typography variant="h5" sx={{ pb: 5, pt: 3 }} alignContent={"center"}>
          NeetCode 150 DSA Sheet
        </Typography>
      </Stack>
      <TopicListView topic={topic!} sheetName={params.sheetName} />
    </>
  );
}
