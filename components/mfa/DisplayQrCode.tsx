import QRCode from "qrcode.react";
import { Dispatch, SetStateAction } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function DisplayQrCode({
  qrCode,
  email,
  setToken,
  hexCode,
  verify2Fa,
  disableButton,
}: {
  qrCode: string;
  email: string;
  setToken: Dispatch<SetStateAction<string>>;
  hexCode: string;
  verify2Fa: () => Promise<void>;
  disableButton: boolean;
}) {
  return (
    <div className="min-h-full  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="">
          <div className="aspect-w-4  aspect-h-3 rounded-lg overflow-hidden">
            {qrCode.length > 0 && (
              <QRCode
                value={qrCode}
                size={400}
                className="w-full h-full object-center object-cover"
              />
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <h1 className="text-2xl font-extrabold tracking-tight  sm:text-3xl">
                Scan the QR code and verify it!
              </h1>
              <p className="text-base mt-2">User {email}</p>
            </div>
          </div>

          <p className=" mt-6">
            To improve account security you need to enable 2 factor auth. You
            can use any app like authy, google auth etc. This is a compulsory
            step to do.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="account-number"
                id="account-number"
                className="w-full border border-transparent placeholder-black text-black bg-white rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                placeholder="000000"
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => verify2Fa()}
              disabled={disableButton}
              className={classNames(
                disableButton
                  ? "w-full cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  : "w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
              )}
            >
              Verify Otp
            </button>
          </div>
          <p className="mt-6">Or copy the hex code</p>
          <div>{hexCode}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayQrCode;
