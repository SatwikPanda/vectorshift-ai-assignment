import { useState } from "react";
import { BaseNode } from "../baseNode";

import { ReactComponent as AddLLMSVG } from "../../assets/icons/AddNodeMenu/add-llm.svg"

import "./LLMNode.css";

export const LLMNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.llmName || id.replace('llm-', 'llm_'));
  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="llm"
      icon={<AddLLMSVG />}
      inputs={[{ id: `${id}-system` }, { id: `${id}-prompt` }]}
      outputs={[{ id: `${id}-response` }]}
      selected={selected}
    >
      <span className="llm-info">This is a Large Language Model node.</span>
    </BaseNode>
  );
};
