import { Handle, Position } from 'reactflow';
import "./baseNode.css";

export const BaseNode = ({ 
  title,
  icon,
  type,
  inputs = [],
  outputs = [],
  children
}) => {

  const typeClass = type ? `baseNode--${type}` : '';

  return(
    <div className={`baseNode ${typeClass}`}>
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
      <div className="baseNode-header">
        {icon && <div className="baseNode-icon">{icon}</div>}
        <strong>{title}</strong>
      </div>

      {/* Children */}
      <div className="baseNode-body">{children}</div>

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