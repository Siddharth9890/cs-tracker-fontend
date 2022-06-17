import { questionType } from "../../customTypes";

function Description({ question }: { question: questionType }) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const statusStyles: any = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Question Information
        </h3>
        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Solved :- {question.how_many_times_solved} times
        </p> */}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Question name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {question.question_name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Topic</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {question.under_which_topic}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {question.question_description}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
            <dd
              className={classNames(
                statusStyles[question.difficulty],
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
              )}
            >
              {question.difficulty}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Description;
