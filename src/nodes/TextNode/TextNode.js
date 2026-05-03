import { useState, useRef, useEffect } from 'react';
import { BaseNode } from '../baseNode';
import { TextArea } from '../../components/fields';
import { useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../../store';

import { ReactComponent as TextNodeSVG } from "../../assets/icons/AddNodeMenu/modify-text.svg"


import "./TextNode.css";

export const TextNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.textName || id.replace('text-', 'text_'));
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);
  const onConnect = useStore(state => state.onConnect);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    // Extract variables matching {{varName}}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)].map(match => match[1]);
    const uniqueVariables = [...new Set(matches)];
    console.log("TextNode useEffect", { currText, matches, uniqueVariables });
    setVariables(uniqueVariables);
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    updateNodeInternals(id);
  }, [currText, id, updateNodeInternals]);

  useEffect(() => {
    // Auto-connect edges
    const getNodeName = (node) => {
      if (node.data?.nodeName) return node.data.nodeName;
      if (node.type === 'textInput') return node.data?.textInputName || node.id.replace('textInput-', 'textInput_');
      if (node.type === 'imageInput') return node.data?.imageInputName || node.id.replace('imageInput-', 'imageInput_');
      if (node.type === 'llm') return node.data?.llmName || node.id.replace('llm-', 'llm_');
      if (node.type === 'text') return node.data?.textName || node.id.replace('text-', 'text_');
      return null;
    };

    const getSourceHandle = (node) => {
      if (node.type === 'textInput' || node.type === 'imageInput') return `${node.id}-value`;
      if (node.type === 'llm') return `${node.id}-response`;
      if (node.type === 'text') return `${node.id}-output`;
      return null;
    };

    variables.forEach(v => {
      const targetHandleId = `${id}-var-${v}`;
      // Check if edge already exists
      if (edges.some(e => e.target === id && e.targetHandle === targetHandleId)) return;

      const matchedNode = nodes.find(n => n.id !== id && getNodeName(n) === v);
      if (matchedNode) {
        onConnect({
          source: matchedNode.id,
          sourceHandle: getSourceHandle(matchedNode),
          target: id,
          targetHandle: targetHandleId
        });
      }
    });
  }, [variables, nodes, edges, id, onConnect]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const dynamicInputs = variables.map(v => ({ id: `${id}-var-${v}`, label: v }));
  console.log("TextNode render", { id, currText, variables, dynamicInputs });

  // Render text with highlighting
  const renderHighlightedText = () => {
    const regex = /(\{\{\s*[a-zA-Z_$][a-zA-Z_$0-9]*\s*\}\})/g;
    const parts = currText.split(regex);
    return parts.map((part, i) => {
      if (regex.test(part)) {
        return <mark key={i} className="text-highlight">{part}</mark>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <BaseNode
      id={id}
      title={currName}
      onTitleChange={setCurrName}
      type="text"
      icon={<TextNodeSVG />}
      inputs={dynamicInputs}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <div className="text-editor-container">
        <div className="text-backdrop">
          {renderHighlightedText()}
        </div>
        <textarea
          ref={textareaRef}
          className="text-area-input"
          value={currText}
          onChange={handleTextChange}
        />
      </div>
    </BaseNode>
  );
}
