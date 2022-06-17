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
    <>
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
      <ReactTrixRTEInput
        toolbarId="react-trix-rte-editor"
        className="relative border min-h-screen h-full border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
        placeholder={
          notes === "" ? "Start typing something no previous notes found" : ""
        }
        onChange={handleChange}
        defaultValue={notes === "" ? "<div></div>" : notes}
      />
    </>
  );
}
export default Editor;
