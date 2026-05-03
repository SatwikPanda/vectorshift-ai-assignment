// inputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { SelectField, TextField } from '../components/fields';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title="Input"
      type="input"
      icon="↓"
      outputs={[{ id: `${id}-value` }]}
    >
      <TextField label="Name" value={currName} onChange={handleNameChange} />
      <SelectField 
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={[ "Text", "File" ]}
      />
    </BaseNode>
  );
}
