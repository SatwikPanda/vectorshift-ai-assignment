// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../store";
import { TextInputNode } from "../../nodes/TextInputNode/TextInputNode";
import { ImageInputNode } from "../../nodes/ImageInputNode/ImageInputNode";
import { LLMNode } from "../../nodes/LLMNode/LLMNode";
import { TextOutputNode } from "../../nodes/TextOutputNode/TextOutputNode";
import { ImageOutputNode } from "../../nodes/ImageOutputNode/ImageOutputNode";
import { TextNode } from "../../nodes/TextNode/TextNode";

import "reactflow/dist/style.css";
import "./PiplelineUI.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  textInput: TextInputNode,
  imageInput: ImageInputNode,
  llm: LLMNode,
  textOutput: TextOutputNode,
  imageOutput: ImageOutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  showMiniMap: state.showMiniMap,
  reactFlowInstance: state.reactFlowInstance,
  setReactFlowInstance: state.setReactFlowInstance,
  activeTool: state.activeTool,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    showMiniMap,
    reactFlowInstance,
    setReactFlowInstance,
    activeTool,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Extract extra data (inputType, outputType, etc.) from the drag payload
        const { nodeType, ...extraData } = appData;

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: { ...getInitNodeData(nodeID, type), ...extraData },
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onEdgeClick = useCallback(
    (event, edge) => {
      if (activeTool === 2) {
        onEdgesChange([{ id: edge.id, type: "remove" }]);
      }
    },
    [activeTool, onEdgesChange]
  );

  return (
    <>
      <div ref={reactFlowWrapper} className="pipeline-ui">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeClick={onEdgeClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="simplebezier"
          deleteKeyCode={activeTool === 1 ? ['Backspace', 'Delete'] : null}
        >
          <Background
            color="rgb(255,255,255, 0.5)"
            gap={gridSize}
            variant="dots"
          />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === "input") return "#6ede87";
              if (node.type === "output") return "#ff0072";
              return "#999";
            }}
            nodeStrokeWidth={3}
            nodeBorderRadius={4}
            maskColor="rgba(0, 0, 0, 0.2)"
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              marginBottom: "4rem",
              opacity: 0,
            }}
          />
        </ReactFlow>
      </div>
    </>
  );
};
