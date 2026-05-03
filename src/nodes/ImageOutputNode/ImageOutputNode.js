import { useState } from 'react';
import { BaseNode } from '../baseNode';

import { ReactComponent as ImageOutputSVG } from "../../assets/icons/AddNodeMenu/img-output.svg"


import "./ImageOutputNode.css";

export const ImageOutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.imageOutputName || id.replace('imageOutput-', 'imageOutput_'));

  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="imageOutput"
      icon={<ImageOutputSVG />}
      inputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <div className="image-output-container">
        <span>Image Result</span>
      </div>
    </BaseNode>
  );
}
