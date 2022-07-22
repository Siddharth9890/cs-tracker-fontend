import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Loading from "../../../components/utils/Loading";
import NoDetailsFound from "../../../components/utils/NoDetailsFound";
import SingleQuestionDescription from "../../../components/SingleQuestionDescription/SingleQuestionDescription";
import { cacheServerUrl } from "../../../api";
import { questionType } from "../../../customTypes";

function SingleQuestion({ question }: { question: questionType | null }) {
  const router = useRouter();

  return router.isFallback ? (
    <Loading />
  ) : question === null ? (
    <NoDetailsFound />
  ) : (
    <div className="h-full">
      <Head>
        <title>{question.question_name}</title>
      </Head>
      <div className="py-4">
        <main>
          <SingleQuestionDescription question={question} />
        </main>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await cacheServerUrl.get(
    "/question/Linked List/Reverse Linked List"
  );
  const s = data.body;
  return {
    paths: [
      {
        params: {
          questionName: `${s.question_name}`,
          subjectName: `${s.under_which_topic}`,
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { subjectName, questionName } = context.params!;
  let question = null;
  try {
    const { data } = await cacheServerUrl.get(
      `/question/${subjectName}/${questionName}`
    );
    question = data.body;
  } catch (error) {}

  return {
    props: {
      question,
    },
  };
};

export default SingleQuestion;
