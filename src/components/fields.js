import { useRef, useEffect } from "react";

export const TextField = ({ label, value, onChange }) => {
  if (!label) {
    return <input type="text" value={value} onChange={onChange} />;
  }
  return (
    <label>
      {label}
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

export const TextArea = ({ label, value, onChange }) => {
  const textareaRef = useRef(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  const handleChange = (e) => {
    if (onChange) onChange(e);
    resize();
  };

  const style = {
    resize: "none",
    overflow: "hidden",
    minHeight: "40px",
  };

  if (!label) {
    return (
      <textarea
        ref={textareaRef}
        style={style}
        value={value}
        onChange={handleChange}
      />
    );
  }
  return (
    <label>
      {label}
      <textarea
        ref={textareaRef}
        style={style}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export const SelectField = ({ label, value, onChange, options }) => (
  <label>
    {label}
    <select value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);
