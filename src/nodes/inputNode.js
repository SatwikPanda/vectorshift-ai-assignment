// inputNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";
import { SelectField, TextField } from "../components/fields";
import { ReactComponent as TextInputSVG } from "../assets/icons/AddNodeMenu/text-input.svg";
import { ReactComponent as FileInputSVG } from "../assets/icons/AddNodeMenu/file-input.svg";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title={currName}
      onTitleChange={setCurrName}
      type="input"
      icon={inputType === "Text" ? <TextInputSVG /> : <FileInputSVG />}
      outputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      {inputType === "Text" ? (
        <TextField value={currName} onChange={handleNameChange} />
      ) : null}
      <SelectField
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={["Text", "File"]}
      />
    </BaseNode>
  );
};
