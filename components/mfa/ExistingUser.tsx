import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authPic from "../../public/authPic.webp";
import axios from "../../api";
import store2 from "store2";
import useUser from "../../hooks/useUser";

toast.configure();
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ExistingUser({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const [user] = useUser();
  const [counter, setCounter] = useState(3);
  const [setBackupSwitch, setSetBackupSwitch] = useState(true);
  const [backup, setBackup] = useState("");
  const [token, setToken] = useState("");
  const [disableOtpButton, setDisableOtpButton] = useState(true);
  const [disableBackupButton, setDisableBackupButton] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (token.length === 6) setDisableOtpButton(false);
    else setDisableOtpButton(true);
  }, [token]);

  useEffect(() => {
    if (backup.length === 20) setDisableBackupButton(false);
    else setDisableBackupButton(true);
  }, [backup]);

  async function checkOtp() {
    setDisableOtpButton(true);
    if (counter === 0) {
      setSetBackupSwitch(false);
      setDisableOtpButton(true);
      toast.error("Your 3 chances are over please enter backup key!.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      try {
        const { data } = await axios.post(
          "auth/verify-2fa",
          JSON.stringify({ token })
        );
        if (data.body.validated === true) {
          store2.session("account", "mfa-verified");
          router.push("/");
        } else if (data.body.validated === false) {
          toast.error("Entered otp is wrong !.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });

          if (counter >= 0) setCounter(counter - 1);

          setDisableOtpButton(true);
        }
      } catch (error) {
        toast.error("Something went wrong!.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setDisableOtpButton(false);
      }
    }
  }

  async function checkBackupCode() {
    setDisableBackupButton(true);

    try {
      const { data } = await axios.post(
        "auth/verify-backup",
        JSON.stringify({ backup })
      );
      if (data.body.validated === true) {
        router.push("/");
      } else if (data.body.validated === false) {
        toast.error("Account is disabled due to security reasons!.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        await axios.get("auth/logout");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      setDisableBackupButton(false);
    }
  }

  return (
    <div className="">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid  lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg  overflow-hidden">
              <Image
                src={authPic}
                alt={"Auth pic"}
                className="object-center object-cover"
              />
            </div>
          </div>
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            {enabled && (
              <>
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      Enter backup code only 1 chance available.
                    </h1>
                  </div>
                </div>
                <p className=" mt-6">
                  If the backup code is incorrect your account will be disabled
                  and you need to contact the support.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="account-number"
                      id="account-number"
                      onChange={(e) => setBackup(e.target.value)}
                      className="w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                      placeholder="XXX-XX-XXXX"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={disableBackupButton}
                    onClick={() => checkBackupCode()}
                    className={classNames(
                      disableBackupButton
                        ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                        : "w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    )}
                  >
                    Verify Backup Code
                  </button>
                </div>
              </>
            )}

            {!enabled && (
              <>
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-extrabold tracking-tight  sm:text-3xl">
                      Multi Factor Authenticator
                    </h1>
                  </div>
                </div>
                <p className="text-base  mt-2">User {user.email}</p>

                <p className=" mt-6">
                  You have {counter} chances to correct enter otp.
                </p>
                <p className=" mt-6">
                  To keep your account secure, we verify your identity. Enter
                  the code generated by your authenticator app.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="account-number"
                      id="account-number"
                      className="w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                      placeholder="000000"
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => checkOtp()}
                    disabled={disableOtpButton}
                    className={classNames(
                      disableOtpButton
                        ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                        : "w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    )}
                  >
                    Verify
                  </button>
                </div>
              </>
            )}

            <div className="border-t  mt-10 pt-10">
              <Switch.Group
                as="div"
                className="flex items-center justify-between"
              >
                <span className="flex-grow flex flex-col">
                  <Switch.Label
                    as="span"
                    className="text-base font-bold"
                    passive
                  >
                    Enter backup code
                  </Switch.Label>
                  <Switch.Description as="span" className="text-base">
                    You can only enable this option once 3 chances are over.
                  </Switch.Description>
                </span>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  disabled={setBackupSwitch}
                  className={classNames(
                    setBackupSwitch ? " cursor-not-allowed" : "",
                    enabled ? "bg-indigo-600" : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 rounded-full  shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExistingUser;
