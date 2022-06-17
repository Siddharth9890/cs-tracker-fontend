import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../public/logo.png";
import axios from "../../api";

import CheckingAccount from "../../components/utils/CheckingAccount";
import Loading from "../../components/utils/Loading";
import useUser from "../../hooks/useUser";
import store2 from "store2";

import HCaptcha from "@hcaptcha/react-hcaptcha";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

toast.configure();

function Register() {
  const [user, signIn] = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [submitButton, setSubmitButton] = useState(false);

  const test = async (token: string, ekey: string) => {
    console.log(token);
    console.log(ekey);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    setSubmitButton(true);

    try {
      const { data } = await axios.post(
        "auth/signUp",
        JSON.stringify({ user_name: name, email })
      );
      const accessToken = data.body.accessToken;
      const finalUser = { ...data.body.user, accessToken };
      signIn(finalUser);
      store2.session("account", "login-done");
      router.push("/verify");
    } catch (error: any) {
      console.log(error.response.data.body);
      let message = "Something went wrong!";
      if (error?.response?.data?.body?.email?._errors) {
        const e = error?.response?.data?.body?.email?._errors;
        message = e[0];
      } else if (error?.response?.data?.body?.user_name?._errors) {
        const e = error?.response?.data?.body?.user_name?._errors;
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
    setSubmitButton(false);
  };

  function SubmitButton() {
    if (
      name &&
      name.length > 5 &&
      email &&
      email.includes("@") &&
      email.includes(".com")
    ) {
      return (
        <div>
          <button
            type="submit"
            onClick={(e) => submit(e)}
            disabled={submitButton}
            className={classNames(
              submitButton
                ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                : "w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            Sign in
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="w-full flex cursor-not-allowed justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Sign in
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="more than 5 characters"
                    autoComplete="current-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
                    value={email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA!}
                onVerify={(token, ekey) => test(token, ekey)}
              />
              <SubmitButton />
            </div>
            <div className="mt-2 text-center text-lg  text-gray-600">
              Or Have a account{" "}
              <div className="font-medium text-indigo-600 hover:text-indigo-500">
                <Link href={"/login"}>Login In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
