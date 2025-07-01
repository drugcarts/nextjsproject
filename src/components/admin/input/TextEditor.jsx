import { FormHelperText, InputLabel, TextField } from "@mui/material";
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
// import Quill from "quill";
// import QuillImageResize from "quill-image-resize-module-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Quill.register("modules/resize", QuillImageResize);

function TextEditor({ title, value, type, onChange, helperText, error }) {
  const [quillModules, setQuillModules] = useState(null);
  // console.log(value);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("quill").then((Quill) => {
        import("quill-image-resize-module-react").then((QuillImageResize) => {
          Quill.default.register("modules/imageResize", QuillImageResize.default);

          // Set Quill modules after registration
          setQuillModules({
            toolbar: [
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["table"],
              [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
            imageResize: {
              modules: ["Resize"],
            }, // Ensure the resize module is registered
          });
        });
      });
    }
  }, []);


  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["table"],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    resize: {
      modules: ["Resize"],
    },
  };


  return (
    <div>
      <InputLabel
        id="input"
        sx={{
          mt: 1,
          mb: 0.5,
          fontWeight: 600,
          fontFamily: "Poppins",
          color: "#000",
          fontSize: 14,
        }}
      >
        {title}
      </InputLabel>
      {quillModules && ( // Render Quill only when modules are set
        <ReactQuill modules={quillModules} theme="snow" value={value} onChange={onChange} />
      )}
      <FormHelperText error>{error}</FormHelperText>
    </div>
  );
}

export default TextEditor;
