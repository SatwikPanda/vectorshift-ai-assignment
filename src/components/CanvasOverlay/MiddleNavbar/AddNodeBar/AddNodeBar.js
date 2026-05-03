import { useEffect, useRef, useCallback } from "react";
import { useStore } from "../../../../store";
import "./AddNodeBar.css";
import gsapInit from "../../../../animations/gsapInit";

import { ReactComponent as TextInputSVG } from "../../../../assets/icons/AddNodeMenu/text-input.svg";
import { ReactComponent as FileInputSVG } from "../../../../assets/icons/AddNodeMenu/file-input.svg";

import { ReactComponent as ModifyTextSVG } from "../../../../assets/icons/AddNodeMenu/modify-text.svg";

import { ReactComponent as AddLLMSVG } from "../../../../assets/icons/AddNodeMenu/add-llm.svg";

import { ReactComponent as ImageOutputSVG } from "../../../../assets/icons/AddNodeMenu/img-output.svg";
import { ReactComponent as TextOutputSVG } from "../../../../assets/icons/AddNodeMenu/text-output.svg";

// Maps AddNodeBar items → React Flow node types + initial data overrides
const NODE_ITEMS = [
  {
    section: "INPUT",
    items: [
      { type: "customInput", label: "Text Input", icon: TextInputSVG, data: { inputType: "Text" } },
      { type: "customInput", label: "File Input", icon: FileInputSVG, data: { inputType: "File" } },
    ],
  },
  {
    section: "MODIFY",
    items: [
      { type: "text", label: "Modify Text", icon: ModifyTextSVG, data: {} },
    ],
  },
  {
    section: "LLM",
    items: [
      { type: "llm", label: "LLM", icon: AddLLMSVG, data: {} },
    ],
  },
  {
    section: "OUTPUT",
    items: [
      { type: "customOutput", label: "Image Output", icon: ImageOutputSVG, data: { outputType: "Image" } },
      { type: "customOutput", label: "Text Output", icon: TextOutputSVG, data: { outputType: "Text" } },
    ],
  },
];

export default function AddNodeBar({ isOpen, onClose }) {
  const menuRef = useRef();
  const tl = useRef();

  const getNodeID = useStore((s) => s.getNodeID);
  const addNode = useStore((s) => s.addNode);
  const reactFlowInstance = useStore((s) => s.reactFlowInstance);

  useEffect(() => {
    const gsap = gsapInit();

    tl.current = gsap.timeline({ paused: true });

    tl.current.fromTo(
      menuRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "expressive-fast-spatial",
      },
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isOpen]);

  // click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Click-to-add: places the node at the center of the visible viewport
  const handleAddNode = useCallback(
    (nodeType, extraData = {}) => {
      if (!reactFlowInstance) return;

      const { x, y, zoom } = reactFlowInstance.getViewport();
      // Get the React Flow container dimensions
      const rfPane = document.querySelector(".react-flow");
      const bounds = rfPane
        ? rfPane.getBoundingClientRect()
        : { width: 800, height: 600 };

      // Convert the center of the screen to flow coordinates
      const centerPosition = reactFlowInstance.project({
        x: bounds.width / 2,
        y: bounds.height / 2,
      });

      const nodeID = getNodeID(nodeType);
      const newNode = {
        id: nodeID,
        type: nodeType,
        position: centerPosition,
        data: { id: nodeID, nodeType, ...extraData },
      };

      addNode(newNode);
      onClose();
    },
    [reactFlowInstance, getNodeID, addNode, onClose],
  );

  // Drag handler: sets data transfer so PipelineUI's onDrop can pick it up
  const onDragStart = useCallback((event, nodeType, extraData = {}) => {
    const appData = { nodeType, ...extraData };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <div
      ref={menuRef}
      className="add-node-menu"
      style={{
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {NODE_ITEMS.map((section) => (
        <div className="section-container" key={section.section}>
          <span className="section-heading">{section.section}</span>
          {section.items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.type}-${item.label}`}
                draggable
                onDragStart={(e) => onDragStart(e, item.type, item.data)}
                onClick={() => handleAddNode(item.type, item.data)}
              >
                {" "}
                <div className="item-svg">
                  <Icon />
                </div>{" "}
                <span className="item-text">{item.label}</span>{" "}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
