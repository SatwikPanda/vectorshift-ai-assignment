import { Handle, Position } from "reactflow";
import { useState, useRef, useEffect } from "react";
import { useStore } from "../store";
import "./baseNode.css";

export const BaseNode = ({
  id,
  title,
  onTitleChange,
  icon,
  type,
  inputs = [],
  outputs = [],
  children,
  selected,
}) => {
  const activeTool = useStore((state) => state.activeTool);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const isSelectMode = activeTool === 1;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onTitleChange && editTitle !== title && editTitle.trim() !== "") {
      onTitleChange(editTitle);
      if (id) {
        updateNodeField(id, "nodeName", editTitle);
      }
    } else {
      setEditTitle(title);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const typeClass = type ? `baseNode--${type}` : "";
  const selectedClass = selected && isSelectMode ? "baseNode--selected" : "";

  return (
    <div className={`baseNode ${typeClass} ${selectedClass}`}>
      {inputs.map((input, i) => (
        <div
          key={input.id}
          style={{
            position: "absolute",
            top: `${((i + 1) * 100) / (inputs.length + 1)}%`,
            left: "-12px",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={input.id}
            style={{
              position: "relative",
              top: "auto",
              left: "auto",
              transform: "none",
            }}
          />
        </div>
      ))}

      {/* Title */}
      <div className="baseNode-header" onDoubleClick={handleDoubleClick}>
        {icon && <div className="baseNode-icon">{icon}</div>}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="baseNode-title-input"
          />
        ) : (
          <strong>{title}</strong>
        )}
      </div>

      {/* Children */}
      <div className="baseNode-body">{children}</div>

      {/* Outputs */}
      {outputs.map((output, i) => (
        <div
          key={output.id}
          style={{
            position: "absolute",
            top: "10%",
            right: "-2.25rem",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {/* ICON */}
          <div className="handle-icon">
            {icon}
          </div>

          {/* HANDLE */}
          <Handle
            type="source"
            position={Position.Right}
            id={output.id}
            style={{
              position: "relative",
              top: "auto",
              right: "auto",
              width: "30px",
              height: "30px",
            }}
          />
        </div>
      ))}
    </div>
  );
};
