// outputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { SelectField, TextField } from '../components/fields';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title="Output"
      type="output"
      icon="↑"
      inputs={[{ id: `${id}-value` }]}
    >
      <TextField label="Name" value={currName} onChange={handleNameChange} />
      <SelectField label="Type" value={outputType} onChange={handleTypeChange} options={[ "Text", "Image" ]} />
    </BaseNode>
  );
}
