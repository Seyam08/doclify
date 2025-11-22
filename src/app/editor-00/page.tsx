"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, SerializedEditorState } from "lexical";
import { useEffect, useState } from "react";

export function lexicalJsonToHtml(json: any) {
  const editor = createEditor();
  const editorState = editor.parseEditorState(json);

  editor.setEditorState(editorState);

  let html = "";
  editor.update(() => {
    html = $generateHtmlFromNodes(editor);
  });

  return html;
}

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello World 🚀",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function EditorPage() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [html, setHtml] = useState("");
  console.log(html);

  useEffect(() => {
    // editorState → HTML convert
    const generatedHtml = lexicalJsonToHtml(editorState);
    setHtml(generatedHtml);
  }, [editorState]);

  return (
    <>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
      />

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
