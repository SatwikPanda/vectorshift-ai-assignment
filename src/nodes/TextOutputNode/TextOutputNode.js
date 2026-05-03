import { useState } from 'react';
import { BaseNode } from '../baseNode';

import { ReactComponent as TextOutputSVG } from "../../assets/icons/AddNodeMenu/text-output.svg";


import "./TextOutputNode.css";

export const TextOutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.textOutputName || id.replace('textOutput-', 'textOutput_'));

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="textOutput"
      icon={<TextOutputSVG />}
      inputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <div className="text-output-container">
        <span>Text Response</span>
      </div>
    </BaseNode>
  );
}
