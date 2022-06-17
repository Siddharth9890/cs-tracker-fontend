import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
const TrixEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

type props = {
  notes: string | null;
  setNotes: Dispatch<SetStateAction<string | null>>;
  loadingNotes: boolean;
};

function Notes({ notes, setNotes, loadingNotes }: props) {
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 ml-4  mr-4 mb-4  flex-1">
        <div>
          <TrixEditor
            notes={notes}
            setNotes={setNotes}
            loadingNotes={loadingNotes}
          />
        </div>
      </div>
    </div>
  );
}
export default Notes;
