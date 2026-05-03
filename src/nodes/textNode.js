// textNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { TextField } from '../components/fields';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title="Text"
      outputs={[{ id: `${id}-output` }]}
    >
      <TextField label="Text: " value={currText} onChange={handleTextChange} />
    </BaseNode>
  );
}
