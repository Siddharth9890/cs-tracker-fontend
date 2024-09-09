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

// 1) add note, revision date overlay
// 2) search, show bookmarks, sort by revision dates
// 3) questions solved/ total on home page
// 4) ui bugs
// 5) revision tab
// 6) show number in question
// 7) theme colors
// 8) check box and strike
// 9) home add faq stating why local storage and no private data 
// 10) custom sheet and dont allow to edit default sheet
// 11) use index db for storage
// 12) total questions bar 
