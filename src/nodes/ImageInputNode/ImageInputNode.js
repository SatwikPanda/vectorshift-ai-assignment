import { useState } from 'react';
import { BaseNode } from '../baseNode';
import { ReactComponent as FileInputSVG } from "../../assets/icons/AddNodeMenu/file-input.svg";
import "./ImageInputNode.css";

export const ImageInputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.imageInputName || id.replace('imageInput-', 'imageInput_'));

  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="imageInput"
      icon={<FileInputSVG />}
      outputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <div className="image-input-container">
        <span>Upload Image</span>
      </div>
    </BaseNode>
  );
}
