import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { InboxInIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store2 from "store2";

import useUser from "../../hooks/useUser";
import axios from "../../api";

toast.configure();

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function VerifyEmail() {
  const [user] = useUser();
  const [sendOtp, setSendOtp] = useState(true);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [disableVerifyButton, setDisableVerifyButton] = useState(true);
  const [counter, setCounter] = useState(0);

  const router = useRouter();

  const sendOtpFunction = async () => {
    setCounter(60);
    setSendOtp(false);
    try {
      const { data } = await axios.post(
        "auth/send-mail",
        JSON.stringify({ email: user.email })
      );
      setActualOtp(data.body.otp);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  const verifyOtp = (e: any) => {
    if (enteredOtp === actualOtp) {
      store2.session("account", "email-verified-done");
      router.push("/verify-mfa");
    } else {
      toast.error("Entered otp is incorrect please check again!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (enteredOtp.length === 6) setDisableVerifyButton(false);
    else setDisableVerifyButton(true);
  }, [enteredOtp]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && setSendOtp(true);
  }, [counter]);

  useEffect(() => {
    if (user.multi_factor_enabled) router.push("/verify-mfa");
    else if (user.email.length > 0) sendOtpFunction();
    else router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function SendOtpButton() {
    if (sendOtp) {
      return (
        <div>
          <button
            type="submit"
            onClick={() => sendOtpFunction()}
            className="w-full flex justify-center m-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send otp
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            disabled
            type="submit"
            className="w-full flex justify-center cursor-not-allowed m-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {counter === 0 ? "Send Otp Again" : counter}
          </button>
        </div>
      );
    }
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="h-20 w-20 mx-auto">
          <InboxInIcon />
        </div>
        <h2 className="mt-6 text-center text-2xl  text-gray-900">
          Please enter code send to your mail
        </h2>
        <div className="mt-2 text-center  text-gray-600">
          <h3 className="text-center text-xl">{user.email} </h3>
          <div className="font-medium text-indigo-600 hover:text-indigo-500">
            <Link href="/register">Want to change email? Click here</Link>
          </div>
          <h4>The mail might be in spam</h4>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-row justify-center items-center">
            <SendOtpButton />
            <label
              htmlFor="otp"
              className="block text-sm ml-8 font-medium text-gray-700 m-4"
            >
              Enter OTP
            </label>
            <div className="mt-1">
              <input
                id="otp"
                name="otp"
                type="text"
                required
                placeholder="000000"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setEnteredOtp(e.target.value)}
                value={enteredOtp}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={disableVerifyButton}
              onClick={(e) => verifyOtp(e)}
              className={classNames(
                disableVerifyButton
                  ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  : "w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              Verify Otp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
