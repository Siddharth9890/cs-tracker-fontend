import QRCode from "qrcode.react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../api";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import store2 from "store2";
import Image from "next/image";

toast.configure();

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NewUser({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const [token, setToken] = useState("");
  const [user] = useUser();
  const [hexCode, setHexCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [backup, setBackup] = useState("");
  const [readAgreements, setReadAgreements] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const router = useRouter();

  const get2Fa = async () => {
    setDisableButton(true);
    try {
      const { data } = await axios.post("auth/register-2fa", undefined);
      setQrCode(data.body.secret.otpauth_url);
      setHexCode(data.body.secret.base32);
      setDisableButton(true);
    } catch (error) {
      toast.error("Something went wrong!.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      setDisableButton(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) get2Fa();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify2Fa = async () => {
    setDisableButton(true);

    try {
      const { data } = await axios.post(
        "auth/validate-2fa",
        JSON.stringify({ token })
      );
      if (data.body.validated === true) {
        store2.session("account", "mfa-verified");
        setBackup(data.body.backup);
        setEnabled(true);
        setDisableButton(false);
      } else if (data.body.validated === false) {
        toast.error("Entered otp is wrong !.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setDisableButton(true);
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
      setDisableButton(false);
    }
  };

  useEffect(() => {
    if (token.length === 6) setDisableButton(false);
    else setDisableButton(true);
  }, [token]);

  return enabled ? (
    <div className="">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
                <span className="block sm:inline">Important Update</span>
                <span className="block sm:inline">About Your Account</span>
              </h2>
              <p className="">
                This is the backup code keep in in a safe place. If you lost the
                backup code then you need to contact support.
              </p>
              <p className="">{backup}</p>
              <label>
                <input
                  type="checkbox"
                  id="check-confirm"
                  name="check-confirm"
                  checked={readAgreements}
                  onChange={() => setReadAgreements(!readAgreements)}
                />
                <p className="">I Accept the above statement.</p>
              </label>
              <button
                type="submit"
                disabled={!readAgreements}
                onClick={() => router.push("/")}
                className={classNames(
                  !readAgreements
                    ? "mt-6 w-full bg-gray-600 cursor-not-allowed border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    : "mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                Proceed!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4  aspect-h-3 rounded-lg overflow-hidden">
              <QRCode
                value={qrCode}
                size={400}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight  sm:text-3xl">
                  Scan the QR code and verify it!
                </h1>
                <p className="text-base mt-2">User {user.email}</p>
              </div>
            </div>

            <p className=" mt-6">
              To improve account security you need to enable 2 factor auth. You
              can use any app like authy, google auth etc. This is a compulsory
              step to do.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="account-number"
                  id="account-number"
                  className="w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  placeholder="000000"
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={() => verify2Fa()}
                disabled={disableButton}
                className={classNames(
                  disableButton
                    ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                    : "w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                )}
              >
                Verify Otp
              </button>
            </div>
            <p className="mt-6">Or copy the hex code</p>
            <div>{hexCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
