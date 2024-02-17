import { Fragment, useRef } from "react";

function LoadingUser() {
  const cancelButtonRef = useRef(null);

  return <div>The Cs-tracker Dashboard is loading</div>;
}
export default LoadingUser;
