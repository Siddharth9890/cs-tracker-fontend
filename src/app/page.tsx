import TopicDetails from "./components/topics-card";
import { Topic } from "@/types";

export default function Home() {
  const topics: Topic[] = [
    { description: "learn ll", name: "ll", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
    { description: "learn trees", name: "trees", questions: [] },
  ];

  return (
    <main>
      <TopicDetails topics={topics} />
    </main>
  );
}
