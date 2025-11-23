import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import styled from "@emotion/styled";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

function Editor() {
  const quill = useRef(null);

  useEffect(() => {
    const options = {
      debug: false,
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    };
    if (!quill.current) {
      quill.current = new Quill("#editor", options);
      console.log("🚀 ~ Editor ~ quill.current:", quill.current);
    }
    return () => {};
  }, []);

  return (
    <EditorContainer>
      <button onClick={() => console.info(quill.current.getSemanticHTML())}>
        GET HTML
      </button>
      <div id="editor"></div>
    </EditorContainer>
  );
}

export default Editor;

const EditorContainer = styled.div`
  width: 700px;
  height: 500px;
  margin: 20px;
`;
