import { useRef, useEffect } from "react";
import "./Input.css";


export default function Input({ type, value, onChange, onTranslate, readOnly, placeholder }) {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", adjustHeight);

    adjustHeight();

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [])

  return (
    <textarea
      ref={textareaRef}
      rows="10"
      cols="35"
      className={`input-${type}`}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
}