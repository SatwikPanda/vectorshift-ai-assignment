import { Handle, Position } from 'reactflow';
import "./baseNode.css";

export const BaseNode = ({ 
  title,
  inputs = [],
  outputs = [],
  children
}) => {


  return(
    <div className=''>
      {inputs.map((input, i)=>(
        <Handle 
          key={input.id}
          type='target'
          position={Position.Left}
          id={input.id}
          style={{ top: `${((i + 1) * 100) / (inputs.length + 1)}%` }}
        />
      ))}

      {/* Title */}
      <div>
        <strong>{title}</strong>
      </div>

      {/* Children */}
      <div>{children}</div>

      {/* Outputs */}
      {outputs.map((output, i) => (
        <Handle 
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: `${((i + 1) * 100) / (outputs.length + 1)}%` }}
        />
      ))}
    </div>
  );
}