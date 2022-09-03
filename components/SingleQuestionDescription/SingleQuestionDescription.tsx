import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon, ReplyIcon } from "@heroicons/react/solid";

import { CalendarIcon } from "@heroicons/react/outline";
import { questionType, userType } from "../../customTypes";

import DateSelector from "../utils/DateSelector";
import { SuccessModal } from "../Modals/SuccessModel";
import Description from "./Description";
import { SuccessModalForLeetCode } from "../Modals/SuccessModalForLeetCode";
import { ErrorModal } from "../Modals/ErrorModel";
import Notes from "./Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import Button from "../utils/Button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function SingleQuestionDescription({ question }: { question: questionType }) {
  const [user, signIn, signOut, increaseCountOfQuestion] = useUser();
  const [motivationButton, setMotivationButton] = useState(false);
  const [revisionButton, setRevisionButton] = useState(false);
  const [userNotError, setUserNotError] = useState(false);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState<string | null>("");

  const [submitButton, setSubmitButton] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [leetCodeButton, setLeetCodeButton] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [revisionDate, setRevisionDate] = useState<Date | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const loadNotes = async (user: userType) => {
    setLoadingNotes(true);
    try {
      const { data } = await axiosPrivate.get(
        `/submission/${user.email}/${question.question_name}`
      );
      setNotes(data.body.notes);
      setLoadingNotes(false);
    } catch (error) {
      setLoadingNotes(false);
      setNotes("");
    }
  };

  useEffect(() => {
    if (user.email.length > 0) loadNotes(user);
    return () => {
      setNotes("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitData = async (question: questionType) => {
    setDisableSubmitButton(true);
    try {
      if (user.email.length === 0) {
        setDisableSubmitButton(false);
        setUserNotError(true);
      } else {
        await axiosPrivate.post("/submission", {
          question_name: question.question_name,
          question_topic: question.under_which_topic,
          submitted_by: user.email,
          is_completed: true,
          completion_date: new Date(Date.now()),
          revision_date: revisionDate ? revisionDate : undefined,
          notes,
        });

        increaseCountOfQuestion();
        await axiosPrivate.put("/auth/update", {
          email: user.email,
          user: user,
        });
        setSubmitButton(true);
        setRevisionButton(false);
        setDisableSubmitButton(false);
      }
    } catch (error) {
      setError(true);
      setDisableSubmitButton(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="min-h-0 flex-1 flex overflow-hidden">
          <main className="min-w-0 flex-1 border-t border-black dark:border-white border-2 rounded-lg xl:flex">
            <section
              aria-labelledby="message-heading"
              className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
            >
              <div className="flex-shrink-0 border-black dark:border-white border-2 rounded-lg">
                <div className="h-16 flex flex-col justify-center">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-3 flex justify-between">
                      <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                          <span className="inline-flex sm:shadow-sm">
                            <a
                              href={question.youtube_video_link}
                              target={"_blank"}
                              rel="noreferrer"
                              className="relative inline-flex items-center mr-4 px-4 py-2 rounded-l-md border shadow-sm border-transparent  text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                              <ReplyIcon
                                className="mr-2.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              <span>Solution</span>
                            </a>
                            <button
                              type="button"
                              onClick={() =>
                                setMotivationButton(!motivationButton)
                              }
                              className="hidden sm:inline-flex -ml-px mr-4 relative items-center px-4 py-2 border shadow-sm border-transparent  text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                              <PencilIcon
                                className="mr-2.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              <span>Motivation</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setRevisionButton(!revisionButton)}
                              className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border shadow-sm border-transparent  text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                            >
                              <CalendarIcon
                                className="mr-2.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              <span>Revision Date</span>
                            </button>
                          </span>
                          {revisionButton && (
                            <>
                              <DateSelector
                                open={revisionButton}
                                setOpen={setRevisionButton}
                                revisionDate={revisionDate}
                                setRevisionDate={setRevisionDate}
                              />
                            </>
                          )}
                          {revisionDate && (
                            <p>
                              {revisionDate !== null
                                ? new Date(revisionDate).toDateString()
                                : ""}
                            </p>
                          )}
                          <Menu
                            as="span"
                            className="-ml-px relative block sm:shadow-sm lg:hidden"
                          >
                            <div>
                              <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 sm:rounded-md sm:px-3">
                                <span className="sr-only sm:hidden">More</span>
                                <span className="hidden sm:inline">More</span>
                                <ChevronDownIcon
                                  className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setMotivationButton(!motivationButton)
                                        }
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block sm:hidden px-4 py-2 text-sm"
                                        )}
                                      >
                                        <span>Motivation</span>
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setRevisionButton(!revisionButton)
                                        }
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block sm:hidden px-4 py-2 text-sm"
                                        )}
                                      >
                                        Revision Date
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </span>
                      </div>

                      {/* Right buttons */}
                      <nav aria-label="Pagination">
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                          <button
                            type="button"
                            onClick={() => setLeetCodeButton(true)}
                            disabled={leetCodeButton}
                            className={classNames(
                              leetCodeButton ? "cursor-not-allowed" : "",
                              "relative mr-4 inline-flex items-center px-4 py-2 border shadow-sm border-transparent  text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            )}
                          >
                            <span>leetcode!</span>
                          </button>

                          <Button
                            disabled={disableSubmitButton}
                            text={"Submit"}
                            onClick={() => submitData(question)}
                          />
                        </span>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="pt-5 pb-6 shadow">
                  <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                    <div className="sm:w-0 sm:flex-1 ">
                      <h1 id="message-heading" className="text-lg font-medium">
                        Write some notes to remember {question.question_name}
                      </h1>
                    </div>
                  </div>
                </div>
                <Notes
                  notes={notes}
                  setNotes={setNotes}
                  loadingNotes={loadingNotes}
                />
              </div>
            </section>
            <aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
              <div className="h-full relative flex flex-col w-96  border-black dark:border-white border-2 rounded-lg ">
                <Description question={question} />
              </div>
            </aside>
          </main>
        </div>
        <SuccessModal
          show={submitButton}
          setOpen={setSubmitButton}
          headingMessage={"Thanks for submitting"}
          message={
            "Your response is recorded if you have set a revision date then please check revision tab"
          }
        />
        <SuccessModalForLeetCode
          show={leetCodeButton}
          setOpen={setLeetCodeButton}
          headingMessage={"You can now go to leetcode!"}
          message={
            "Click on ok we will redirect you to page to solve the problem on leetcode after you are done please press on submit button to record the question "
          }
          href={question.leet_code_problem_link}
        />

        <SuccessModal
          show={motivationButton}
          setOpen={setMotivationButton}
          headingMessage={""}
          message={
            "It's absolutely normal if you did not remember how to solve the question.You can check for the solution video.And at last practice makes perfect 😊😊."
          }
        />
        <ErrorModal
          show={userNotError}
          setOpen={setUserNotError}
          headingMessage={"You cannot submit"}
          message={
            "You don't have a account so you cant submit the question. Please create a account first to proceed"
          }
        />
        <ErrorModal
          show={error}
          setOpen={setError}
          headingMessage={"You cannot submit"}
          message={
            "There is some problem on server please try again. If problem persist contact support"
          }
        />
      </div>
    </>
  );
}

export default SingleQuestionDescription;
