import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import styled from "@emotion/styled";
import { useTemplates } from "@hooks";
import { useImperativeHandle } from "react";

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

const Editor = React.forwardRef(
  ({ form, isOpenedOnce, setIsOpenedOnce }, ref) => {
    const quill = useRef(null);
    const { templates } = useTemplates({ enabled: !isOpenedOnce });

    useEffect(() => {
      setIsOpenedOnce(true);

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
      }
      return () => {};
    }, []);

    useEffect(() => {
      if (form.watch("description")) {
        quill.current?.clipboard.dangerouslyPasteHTML(
          form.watch("description")
        );
      }
    }, [form.watch("description")]);

    const getHtmlContent = () =>
      quill.current
        .getSemanticHTML()
        ?.replaceAll("background-color: rgb(255, 255, 255);", "");

    useImperativeHandle(ref, () => ({
      getHtmlContent: getHtmlContent,
    }));

    return (
      <Container>
        <LeftContainer>
          <MapContainer>
            {templates.map(({ id, name, content: html }) => (
              <TextWrapper
                key={id}
                onClick={() =>
                  quill.current?.clipboard.dangerouslyPasteHTML(html)
                }
              >
                {name}
              </TextWrapper>
            ))}
          </MapContainer>
        </LeftContainer>
        <EditorContainer>
          <div id="editor"></div>
        </EditorContainer>
      </Container>
    );
  }
);

export default Editor;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;
const LeftContainer = styled.div`
  width: 360px;
  height: 600px;
  overflow-y: auto;
`;
const EditorContainer = styled.div`
  width: 700px;
  height: 500px;
  margin: 0 0 0 20px;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #ebebeb;
`;

const TextWrapper = styled.strong`
  border-bottom: 2px solid #ebebeb;
  padding: 12px;
  margin-bottom: 1px;
  border-radius: 4px;
  cursor: pointer;
  :last-child {
    border-bottom: none;
  }
`;
