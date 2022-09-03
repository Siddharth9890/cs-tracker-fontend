import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CheckingAccount from "../../components/utils/CheckingAccount";
import logo from "../../public/logo.png";
import axios from "../../api";

import HCaptcha from "@hcaptcha/react-hcaptcha";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

toast.configure();

function Login() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    try {
      const { data } = await axios.post(
        "auth/login",
        JSON.stringify({ email })
      );
      const { detailsToSend } = data.body;
      router.push({
        pathname: "/verify",
        query: {
          email: detailsToSend.email,
          multi_factor_enabled: detailsToSend.multi_factor_enabled,
          verified: detailsToSend.verified,
        },
      });
    } catch (error: any) {
      let message = "Something went wrong!";
      if (error?.response?.data?.body?.email?._errors) {
        const e = error?.response?.data?.body?.email?._errors;
        message = e[0];
      }
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    setSubmitButtonDisabled(false);
  };

  function SubmitButton() {
    if (email && email.includes("@") && email.includes(".com")) {
      return (
        <button
          type="submit"
          onClick={(e) => submit(e)}
          disabled={submitButtonDisabled}
          className={classNames(
            submitButtonDisabled
              ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              : "w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          )}
        >
          Log in
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="w-full cursor-not-allowed flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log in
        </button>
      );
    }
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Image src={logo} alt="Workflow" height={40} width={43} />
          </div>
          <h2 className="mt-3 text-center text-3xl font-extrabold">
            Welcome back! ✨
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-3xl">
          <div className="bg-indigo-600   py-8 px-4  shadow-2xl sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="appearance-none block w-full px-3 py-2  placeholder-black text-black bg-white  rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA!}
                onVerify={(token, ekey) => setToken(token)}
              />
               */}
              <SubmitButton />
            </div>
            <div className="mt-2 text-center text-lg text-white">
              Or Create a new account{" "}
              <div className="font-medium text-white">
                <Link href={"/register"}>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
