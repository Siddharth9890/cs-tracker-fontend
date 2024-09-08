import { PageWithParams, Topic } from "@/types";
import TopicListView from "../components/topic-list-view";
import { fetchFile } from "@/lib/fetch";

type Props = PageWithParams<{ topic: string }>;

export default async function QuestionsPage({ params }: Props) {
  console.log(params.topic);

  const data: Topic[] = await fetchFile();

  const topic = data.find(
    (topic) => topic.title.toLowerCase().replace(/\s+/g, "-") === params.topic
  );

  console.log(topic);
  return (
    <>
      <TopicListView topic={topic!} />
    </>
  );
}
