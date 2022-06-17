import { useState } from "react";
import CheckingAccount from "../../components/utils/CheckingAccount";

import useUser from "../../hooks/useUser";
import ExistingUser from "../../components/mfa/ExistingUser";
import NewUser from "../../components/mfa/NewUser";

function Mfa() {
  const [user] = useUser();
  const [enabled, setEnabled] = useState(false);

  return user.email.length === 0 ? (
    <CheckingAccount page="login" />
  ) : user.multi_factor_enabled === false ? (
    <NewUser enabled={enabled} setEnabled={setEnabled} />
  ) : (
    <ExistingUser enabled={enabled} setEnabled={setEnabled} />
  );
}

export default Mfa;
