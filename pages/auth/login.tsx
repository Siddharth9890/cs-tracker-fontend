// sections
import AuthClassicLayout from "src/layouts/auth/classic";
import AmplifyLoginView from "src/sections/auth/amplify/amplify-login-view";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <div>
        <title> Amplify: Amplify Login</title>
      </div>

      <AuthClassicLayout>
        <AmplifyLoginView />
      </AuthClassicLayout>
    </>
  );
}
