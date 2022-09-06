import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { InboxInIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api";
toast.configure();

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function VerifyEmail({
  email,
  emailVerify,
  setEmailVerify,
}: {
  email: string;
  emailVerify: boolean;
  setEmailVerify: Dispatch<SetStateAction<boolean>>;
}) {
  const [sendOtp, setSendOtp] = useState(true);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [disableVerifyButton, setDisableVerifyButton] = useState(true);
  const [counter, setCounter] = useState(0);

  const sendOtpFunction = async () => {
    setCounter(60);
    setSendOtp(false);
    try {
       const { data } = await axios.post(
         "auth/send-mail",
         JSON.stringify({ email: user.email })
       );
      setActualOtp(data.body.otp);
      // setActualOtp("111111");
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

  const verifyOtp = async (e: any) => {
    if (enteredOtp === actualOtp) {
      // auth/verified/
      // need to work on it
      try {
        const { data } = await axios.post(
          "auth/validate",
          JSON.stringify({ email, otp: actualOtp })
        );
        setEmailVerify(true);
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
    if (email && email.length > 0) sendOtpFunction();
  }, []);

  function SendOtpButton() {
    if (sendOtp) {
      return (
        <div>
          <button
            type="submit"
            onClick={() => sendOtpFunction()}
            className="w-full flex justify-center m-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    <div className="min-h-full  shadow-2xl  flex flex-col justify-center py-12 mx-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto  sm:w-full sm:max-w-md">
        <div className="h-20 w-20 mx-auto">
          <InboxInIcon />
        </div>
        <h2 className="mt-6 text-center text-2xl">
          Please enter code send to your mail
        </h2>
        <div className="mt-2 text-center">
          <h3 className="text-center text-xl">{email} </h3>

          <h4>The mail might be in spam</h4>
        </div>
      </div>

      <div className="mt-8 rounded-2xl shadow-xl sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-row justify-center items-center">
            <SendOtpButton />
            <label
              htmlFor="otp"
              className="block text-sm ml-8 font-medium  m-4"
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
                className="appearance-none block w-full px-3 py-2 border  placeholder-black text-black bg-white rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  : "w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
