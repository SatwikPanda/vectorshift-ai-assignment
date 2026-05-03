// textNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";
import { TextField } from "../components/fields";

export const TextNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.textName || id.replace("text-", "text_"),
  );
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title={currName}
      onTitleChange={setCurrName}
      type="text"
      icon="T"
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <TextField value={currText} onChange={handleTextChange} />
    </BaseNode>
  );
};
