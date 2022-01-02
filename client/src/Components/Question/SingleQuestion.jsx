import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NoDetailsFound from "../NoAccount/NoDetailsFound";
import SingleQuestionDescription from "./SingleQuestionDescription";

export default function SingleQuestion() {
  const { subjectName, questionName } = useParams();
  // get a single question
  const [question, setQuestions] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await (
          await fetch(
            `http://localhost:5000/api/v1/question/${subjectName}/${questionName}`
          )
        ).json();
        setQuestions(data.body);
      } catch (error) {}
    }
    getData();
    return () => {
      setQuestions([]);
    };
  }, []);
  return question.length === 0 ? (
    <NoDetailsFound />
  ) : (
    <div className="min-h-screen bg-white">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Question Details
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <SingleQuestionDescription question={question} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
//
