// import React, { useRef } from "react";
// import EditorTo from "./EditorToolbar";
import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./styles.css";

export const Editor = ({ editorState, handleChange }) => {

  // Define custom toolbar options
  const toolbarOptions = [
    ["bold", "italic", "underline", { list: "ordered" }, { list: "bullet" }], // toggled buttons
  ];

  const handleQuillChange = (content, _, source) => {
    // If the content is cleared by the user, set it to an empty string
    if (source === 'user' && content === '<p><br></p>') {
      handleChange('');
    } else {
      handleChange(content);
    }
  };

  return (
    <div className="editor">
      <ReactQuill
        theme="snow"
        placeholder="Write details here..."
        value={editorState}
        onChange={handleQuillChange}
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
};

export default Editor;
