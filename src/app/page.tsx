import TopicDetails from "./components/topics-card";
import { Topic } from "@/types";
import { fetchFile } from "@/lib/fetch";

export default async function Home() {
  const data: Topic[] = await fetchFile();

  return (
    <main>
      <TopicDetails topics={data} />
    </main>
  );
}
