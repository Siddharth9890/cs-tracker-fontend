import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import store2 from "store2";

import { axiosPrivate } from "../../api";
import { userType } from "../../customTypes";
import useRefreshToken from "../../hooks/useRefreshToken";
import useUser from "../../hooks/useUser";
import LoadingUser from "../utils/LoadingUser";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [user, signIn] = useUser();
  const router = useRouter();

  // and this use effect will run only once
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const accessToken = await refresh();
        const { data } = await axiosPrivate.get("/auth/getUser");
        const finalUser: userType = {
          ...data.user,
          accessToken,
        };
        if (
          finalUser.accessToken.length > 0 &&
          finalUser.multi_factor_enabled &&
          store2.session.get("account") === "mfa-verified"
        )
          store2.session("account", "account-restored");
        signIn(finalUser);
      } catch (err) {
        store2.session("account", "clear");
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // so this will run as the user refreshes the page restarts the browser
    user.accessToken?.length === 0 ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <LoadingUser></LoadingUser> : <></>}</>;
};

export default PersistLogin;
