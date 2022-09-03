import { useState } from "react";

import ExistingUser from "../../components/mfa/ExistingUser";
import NewUser from "../../components/mfa/NewUser";

function VerifyMfa({
  email,
  multi_factor_enabled,
}: {
  email: string;
  multi_factor_enabled: boolean;
}) {
  const [enabled, setEnabled] = useState(false);

  return multi_factor_enabled === false ? (
    <NewUser enabled={enabled} setEnabled={setEnabled} email={email} />
  ) : (
    <ExistingUser email={email} enabled={enabled} setEnabled={setEnabled} />
  );
}

export default VerifyMfa;
