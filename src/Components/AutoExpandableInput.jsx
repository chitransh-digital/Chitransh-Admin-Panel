import React, { useCallback, useLayoutEffect, useRef } from "react";

function updateTextAreaSize(textArea) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export const AutoExpandableForm = ({ inputValue, setInputValue }) => {
  const textAreaRef = useRef();

  const inputRef = useCallback((textArea) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <textarea
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ height: 0 }}
          className="text-md flex-grow resize-none overflow-hidden p-4 outline-none"
          placeholder="Write notification content..."
        />
      </div>
    </form>
  );
}

export default AutoExpandableForm;