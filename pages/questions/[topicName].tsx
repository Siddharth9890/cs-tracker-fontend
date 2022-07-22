import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { questionType } from "../../customTypes";
import Loading from "../../components/utils/Loading";

import NoDetailsFound from "../../components/utils/NoDetailsFound";
import { cacheServerUrl } from "../../api";

const statusStyles: any = {
  easy: "bg-green-600",
  medium: "bg-yellow-600",
  hard: "bg-red-600",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function QuestionList({ questions }: { questions: questionType[] }) {
  const router = useRouter();
  const { topicName } = router.query;
  return router.isFallback ? (
    <Loading />
  ) : questions.length === 0 ? (
    <NoDetailsFound />
  ) : (
    <div className="max-w-2xl  mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Head>
        <title>{questions[0].under_which_topic}</title>
      </Head>
      <h2 className="text-2xl font-extrabold tracking-tight">
        Questions for {questions[0].under_which_topic}
      </h2>
      <ul
        role="list"
        className=" mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {questions.map((question) => (
          <li
            key={question.question_name}
            className="border col-span-1 flex flex-col text-center border-black dark:border-white rounded-lg"
          >
            <button
              onClick={() =>
                router.push(`/question/${topicName}/${question.question_name}`)
              }
            >
              <div className="flex-1 flex flex-col p-8">
                <h3 className="mt-6  text-base font-medium">
                  {question.question_name}
                </h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1  text-xs font-medium  rounded-full">
                      Difficulty
                    </span>

                    <span
                      className={classNames(
                        statusStyles[question.difficulty],
                        "px-2 py-1  text-xs font-medium  rounded-full"
                      )}
                    >
                      {question.difficulty}
                    </span>
                  </dd>
                </dl>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await cacheServerUrl.get("/question/Linked List");

  const paths = data.body.map((question: questionType) => {
    return {
      params: {
        topicName: `${question.under_which_topic}`,
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
  let questions: questionType[] = [];
  try {
    const { data } = await cacheServerUrl.get(`/question/${topicName}`);
    questions = data.body;
  } catch (error) {}
  return {
    props: {
      questions,
    },
  };
};
