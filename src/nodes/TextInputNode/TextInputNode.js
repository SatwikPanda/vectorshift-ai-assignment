import { useState } from 'react';
import { BaseNode } from '../baseNode';
import { TextArea } from '../../components/fields';
import { ReactComponent as TextInputSVG } from "../../assets/icons/AddNodeMenu/text-input.svg";
import "./TextInputNode.css";

export const TextInputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.textInputName || id.replace('textInput-', 'textInput_'));
  const [currText, setCurrText] = useState(data?.text || '');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="textInput"
      icon={<TextInputSVG />}
      outputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <TextArea value={currText} onChange={handleTextChange} />
    </BaseNode>
  );
}
