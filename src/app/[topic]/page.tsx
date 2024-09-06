"use client";

import { PageWithParams } from "@/types";
import TopicListView from "../components/topic-list-view";

type Props = PageWithParams<{ topicName: string }>;

export default function QuestionsPage({ params }: Props) {
  return (
    <main>
      <TopicListView />
    </main>
  );
}
