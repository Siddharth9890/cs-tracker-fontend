import { MouseEventHandler } from "react";

function Button({
  disabled,
  onClick,
  text,
  bgColour = "indigo",
}: {
  disabled: boolean;
  text: string;
  bgColour?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return disabled ? (
    <button
      disabled
      type="button"
      className="inline-flex cursor-not-allowed items-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading...
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-${bgColour}-600 hover:bg-${bgColour}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bgColour}-500`}
    >
      {text}
    </button>
  );
}

export default Button;
