import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../api";
import useUser from "../../hooks/useUser";
import BackupCode from "./BackupCode";
import DisplayQrCode from "./DisplayQrCode";

toast.configure();

function NewUser({
  email,
  enabled,
  setEnabled,
}: {
  email: string;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const [token, setToken] = useState("");
  const [hexCode, setHexCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [backup, setBackup] = useState("");
  const [readAgreements, setReadAgreements] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const get2Fa = async () => {
    setDisableButton(true);
    try {
      const { data } = await axios.post(
        "auth/register-2fa",
        JSON.stringify({ email })
      );
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
    if (email && email.length > 0) get2Fa();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify2Fa = async () => {
    setDisableButton(true);

    try {
      const { data } = await axios.post(
        "auth/validate-2fa",
        JSON.stringify({ token, email })
      );
      if (data.body.validated === true) {
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
    <BackupCode
      email={email}
      backup={backup}
      readAgreements={readAgreements}
      setReadAgreements={setReadAgreements}
    />
  ) : (
    <DisplayQrCode
      disableButton={disableButton}
      email={email}
      hexCode={hexCode}
      qrCode={qrCode}
      setToken={setToken}
      verify2Fa={verify2Fa}
    />
  );
}

export default NewUser;
