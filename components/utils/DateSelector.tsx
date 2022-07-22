import { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DateSelector({
  open,
  setOpen,
  revisionDate,
  setRevisionDate,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  revisionDate: Date | null;
  setRevisionDate: Dispatch<SetStateAction<Date | null>>;
}) {
  const cancelButtonRef = useRef(null);
  const date = new Date();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-black dark:text-white"
                      >
                        Select Date
                      </Dialog.Title>
                      <div className="mt-2">
                        <Calendar
                          className={"text-black"}
                          closeCalendar={true}
                          minDate={new Date()}
                          maxDate={new Date(date.setMonth(date.getMonth() + 6))}
                          onChange={(value: SetStateAction<Date | null>) =>
                            setRevisionDate(value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default DateSelector;
