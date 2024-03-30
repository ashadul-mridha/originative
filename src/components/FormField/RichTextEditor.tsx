import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  initialValue: string;
  name: string;
  value: any;
  title: string;
  required: boolean;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue,
  onChange,
  title,
  required,
  name,
  value,
}) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Editor
        onEditorChange={(content) => onChange(content)}
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        init={{
          min_height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        value={value}
        // ref={editorRef}
      />
    </div>
  );
};

export default RichTextEditor;
