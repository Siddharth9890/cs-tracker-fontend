import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import axios from "../../api";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
toast.configure();

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function BackupCode({
  email,
  backup,
  readAgreements,
  setReadAgreements,
}: {
  email: string;
  backup: string;
  readAgreements: boolean;
  setReadAgreements: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, signIn] = useUser();
  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "/auth/get-user",
        JSON.stringify({ email })
      );
      if (data.message === "success") {
        const accessToken = data.body.accessToken;
        const user = data.body.user;
        const finalUser = { ...user, accessToken };
        signIn(finalUser);
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong please try again!.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      router.push("/login");
    }
  };
  const router = useRouter();
  return (
    <>
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Important Update</span>
            <span className="block">About Your Account.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            This is the backup code keep in in a safe place. If you lost the
            backup code then you need to contact support.
          </p>
          <p className="mt-4 text-xl leading-6 ">{backup}</p>
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
            onClick={() => getUser()}
            className={classNames(
              !readAgreements
                ? "mt-6 w-full bg-gray-600 cursor-not-allowed border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                : "mt-6 w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            )}
          >
            Proceed!
          </button>
        </div>
      </div>
    </>
  );
}

export default BackupCode;

