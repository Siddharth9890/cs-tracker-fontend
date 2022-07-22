import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import NoDetailsFound from "../../components/utils/NoDetailsFound";
import Loading from "../../components/utils/Loading";

import { topicType } from "../../customTypes";
import { cacheServerUrl } from "../../api";

function Topics({ topics }: { topics: topicType[] }) {
  const router = useRouter();

  return router.isFallback ? (
    <Loading />
  ) : topics.length === 0 ? (
    <NoDetailsFound />
  ) : (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Head>
        <title>{topics[0].under_which_subject}</title>
      </Head>
      <h2 className="text-2xl font-extrabold tracking-tight">
        Topics for {topics[0].under_which_subject} subject
      </h2>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {topics.map((topic: topicType) => (
          <li
            key={topic.topic_name}
            className="col-span-1 border border-black dark:border-white rounded-lg shadow"
          >
            <button
              onClick={() => router.push(`/questions/${topic.topic_name}`)}
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base font-medium truncate">
                      {topic.topic_name}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5  text-xs font-medium bg-indigo-700 rounded-full">
                      {topic.question_count}
                    </span>
                  </div>
                  <p className="mt-1 text-sm truncate">
                    {topic.topic_description}
                  </p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topics;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await cacheServerUrl.get("/topic/DSAAA");
  const paths = data.body.map((topic: topicType) => {
    return {
      params: {
        topicName: `${topic.topic_name}`,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { topicName } = context.params!;
  let topics: topicType[] = [];
  try {
    const { data } = await cacheServerUrl.get(`/topic/${topicName}`);
    topics = data.body;
  } catch (error) {}
  return {
    props: {
      topics,
    },
  };
};
