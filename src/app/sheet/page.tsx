import { Topic } from "@/types";
import { fetchFile } from "@/lib/fetch";
import TopicDetails from "../../components/topics-card";

export default async function Sheet() {
  const data: Topic[] = await fetchFile();

  return (
    <main>
      <TopicDetails topics={data} />
    </main>
  );
}
