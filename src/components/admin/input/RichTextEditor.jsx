"use client"
import React, { useRef } from "react";

const RichTextEditor = () => {
  const editorRef = useRef(null);

  // Function to execute formatting commands
  const handleCommand = (command) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, null);
    }
  };

  // Alternative function to apply lists manually
  const insertBulletList = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const list = document.createElement("ul");
    list.className = "list-disc pl-5"; // Tailwind CSS for bullets
    const listItem = document.createElement("li");

    if (!range.collapsed) {
      listItem.appendChild(range.extractContents()); // Wrap selected text in <li>
    } else {
      listItem.textContent = ""; // Add a default list item
    }

    list.appendChild(listItem);
    range.deleteContents();
    range.insertNode(list);

    // Move cursor inside the new list
    const newRange = document.createRange();
    newRange.setStart(listItem, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };
  
  const insertOrderedList = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const list = document.createElement("ol");
    list.className = "list-decimal pl-5"; // Tailwind CSS for numbered list
    const listItem = document.createElement("li");
  
    if (!range.collapsed) {
      listItem.appendChild(range.extractContents()); // Wrap selected text in <li>
    } else {
      listItem.textContent = ""; // Add a default list item
    }
  
    list.appendChild(listItem);
    range.deleteContents();
    range.insertNode(list);
  
    // Move cursor inside the new list
    const newRange = document.createRange();
    newRange.setStart(listItem, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border border-gray-300 shadow-md rounded-lg">
      {/* Toolbar */}
      <div className="flex space-x-2 p-2 border-b border-gray-300 bg-gray-100 rounded-t-lg">
        <button onClick={() => handleCommand("bold")} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
          <b>B</b>
        </button>
        <button onClick={() => handleCommand("italic")} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
          <i>I</i>
        </button>
        <button onClick={() => handleCommand("underline")} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
          <u>U</u>
        </button>
        <button onClick={insertOrderedList} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
          1.
        </button>
        <button onClick={insertBulletList} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
          •
        </button>
      </div>

      {/* Editable Text Box */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[150px] border border-gray-300 rounded-b-lg focus:outline-none"
        style={{ whiteSpace: "pre-wrap" }}
      >
        Start typing here...
      </div>
    </div>
  );
};

export default RichTextEditor;
