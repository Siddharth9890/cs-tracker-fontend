import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import useUser from "../../hooks/useUser";

import NoAccountFound from "../../components/utils/NoAccountFound";
import Loading from "../../components/utils/Loading";
import { revisionType } from "../../customTypes";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NoQuestionsFound from "../../components/utils/NoQuestionsFound";
import Button from "../../components/utils/Button";

function Revision() {
  const [user] = useUser();
  const [questions, setQuestions] = useState<revisionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const router = useRouter();

  const getQuestions = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await axiosPrivate.get(`/revision/${email}`);
      const body: revisionType[] = data.body;
      // custom sorting based on dates
      const sortedQuestions = body.sort((a: revisionType, b: revisionType) =>
        a.revision_date.localeCompare(b.revision_date)
      );
      const today = new Date(Date.now());

      const sortedQuestionsAsPerDate = sortedQuestions.filter(
        (question: revisionType) => today.toISOString() < question.revision_date
      );
      setLoading(false);
      setQuestions(sortedQuestionsAsPerDate);
    } catch (error) {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user.email.length > 0) getQuestions(user.email);
    return () => {
      setQuestions([]);
    };
  }, []);

  const handleRemove = async (question: revisionType) => {
    setDisableButton(true);
    try {
      const newList = questions.filter(
        (item) => item.revision_id !== question.revision_id
      );
      await axiosPrivate.delete(`/revision/question/${question.revision_id}`);
      setQuestions(newList);
      router.push(
        `/question/${question.question_topic}/${question.question_name}`
      );
      setDisableButton(false);
    } catch (error) {
      setDisableButton(false);
    }
  };

  return user.email.length === 0 ? (
    <NoAccountFound />
  ) : loading === true ? (
    <Loading />
  ) : questions.length === 0 ? (
    <NoQuestionsFound />
  ) : (
    <>
      <Head>
        <title>Revisions for {user.user_name}</title>
      </Head>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b p-4 border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Section
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.length > 0 &&
                    questions.map((question, questionIdx) => (
                      <tr
                        key={question.revision_id}
                        className={
                          questionIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-base font-bold  text-gray-900">
                          {question.question_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-white">
                          {question.question_topic}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                          {new Date(question.revision_date).toDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            disabled={disableButton}
                            text={"Revision"}
                            onClick={() => handleRemove(question)}
                            bgColour="red"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Revision;
