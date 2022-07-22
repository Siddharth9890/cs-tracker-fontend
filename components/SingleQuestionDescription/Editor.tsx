import Trix from "trix";
import "trix/dist/trix";
import React, { Dispatch, SetStateAction } from "react";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
import Loading from "../utils/Loading";

function Editor({
  notes,
  setNotes,
  loadingNotes,
}: {
  notes: string | null;
  setNotes: Dispatch<SetStateAction<string | null>>;
  loadingNotes: boolean;
}) {
  function handleChange(event: any) {
    setNotes(event.target.innerHTML);
  }
  return loadingNotes ? (
    <>
      <Loading />
    </>
  ) : (
    <div>
      <div className="bg-white">
        <ReactTrixRTEToolbar
          toolbarActions={[
            "bold",
            "italic",
            "strike",
            "heading1",
            "quote",
            "code",
            "bullet",
            "number",
            "outdent",
            "indent",
            "undo",
            "redo",
          ]}
          toolbarId="react-trix-rte-editor"
        />
      </div>
      <ReactTrixRTEInput
        toolbarId="react-trix-rte-editor"
        className="relative min-h-screen h-full text-black  dark:text-white rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
        placeholder={
          notes === "" ? "Start typing something no previous notes found" : ""
        }
        onChange={handleChange}
        defaultValue={notes === "" ? "<div></div>" : notes}
      />
    </div>
  );
}
export default Editor;
