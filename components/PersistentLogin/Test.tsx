import { useRouter } from "next/router";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import LoadingUser from "../utils/LoadingUser";
import store2 from "store2";

// still in test phase has bugs
const Test = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useUser();
  const router = useRouter();

  const value = store2.session.get("account");

  if (user.email.length > 0) {
    if (value === "login-done") router.push("/verify");
    else if (value === "email-verified-done") router.push("/verify-mfa");
  }

  return <>{isLoading ? <LoadingUser></LoadingUser> : <></>}</>;
};

export default Test;
