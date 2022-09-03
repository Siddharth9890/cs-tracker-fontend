import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import VerifyEmail from "../../components/verifyEmail";
import VerifyMfa from "../../components/mfa/verifyMfa";
import { useRouter } from "next/router";

export default function Verify() {
  const router = useRouter();
  const {
    query: { email, verified, multi_factor_enabled },
  } = router;
  useEffect(() => {
    if (!email || !verified || !multi_factor_enabled) router.push("/login");
    if (
      email === undefined ||
      verified === undefined ||
      multi_factor_enabled === undefined
    )
      router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [emailVerify, setEmailVerify] = useState(
    verified === "true" ? true : false
  );

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="hidden fixed inset-0 bg-black md:block" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-indigo-700 px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-8 lg:col-span-7">
                      {!emailVerify && (
                        <VerifyEmail
                          emailVerify={emailVerify}
                          setEmailVerify={setEmailVerify}
                          email={email?.toString()!}
                        />
                      )}
                      {emailVerify && (
                        <VerifyMfa
                          email={email?.toString()!}
                          multi_factor_enabled={
                            multi_factor_enabled === "true" ? true : false
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
