import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "./Loading";

function CheckingAccount({ page }: { page: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace(`/${page}`), 2000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Cs tracker is loading
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              You redirected automatically to home page
            </p>
          </div>
        </div>
      </div>
      <Loading />
    </>
  );
}

export default CheckingAccount;
