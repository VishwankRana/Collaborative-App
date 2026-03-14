import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { socket } from "../socket.js";

export default function Editor({ documentId }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Loading...</p>",
  });

  useEffect(() => {
    if (!editor) return;

    socket.emit("get-document", documentId);

    socket.on("load-document", (data) => {
      editor.commands.setContent(data);
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("update", () => {
      const data = editor.getJSON();
      socket.emit("send-changes", data);
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    socket.on("receive-changes", (data) => {
      editor.commands.setContent(data);
    });
  }, [editor]);

  return (
    <div className="flex justify-center pt-10 bg-gray-100 min-h-screen">
      <div className="w-[800px] bg-white shadow-lg p-6 rounded">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
