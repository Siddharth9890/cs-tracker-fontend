import React, { Dispatch, SetStateAction, useRef } from "react";
import Loading from "../utils/Loading";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({
  notes,
  setNotes,
  loadingNotes,
}: {
  notes: string | null;
  setNotes: Dispatch<SetStateAction<string | null>>;
  loadingNotes: boolean;
}) {
  function handleChange(value: string) {
    console.log(value);
    setNotes(value);
  }
  const quillRef = useRef(null);

  const formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "bullet",
    "code",
    "code-block",
    "color",
    "direction",
    "font",
    "formula",
    "header",
    "image",
    "indent",
    "italic",
    "link",
    "list",
    "script",
    "size",
    "strike",
    "table",
    "underline",
    "video",
    "search",
  ];

  return loadingNotes ? (
    <>
      <Loading />
    </>
  ) : (
    <div className="relative min-h-screen h-full text-black  dark:text-white rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
      <ReactQuill
        ref={quillRef}
        value={notes === null ? "" : notes}
        onChange={handleChange}
        formats={formats}
        className="relative min-h-screen h-full text-black  dark:text-white rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
        placeholder="Write something awesome..."
      />
    </div>
  );
}
export default Editor;
