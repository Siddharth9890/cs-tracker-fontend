import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

// just some sample code to execute the function
function DisableReactDevTools() {
  return (
    <div>
      <></>
    </div>
  );
}

export default DisableReactDevTools;
