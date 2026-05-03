// llmNode.js

import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      type="llm"
      icon="✦"
      inputs={[{ id: `${id}-system` }, { id: `${id}-prompt` }]}
      outputs={[{ id: `${id}-response` }]}
    >
      <span className="llm-info">This is a Large Language Model node.</span>
    </BaseNode>
  );
};
