import HashLoader from "react-spinners/HashLoader";

function Loading() {
  return (
    <div className="flex justify-center  h-screen">
      <HashLoader size={100} />
    </div>
  );
}

export default Loading;
