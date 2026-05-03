import { useViewport } from "reactflow";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow_drop_down.svg"

import "./ZoomButton.css";

export default function ZoomButton() {
  const { zoom } = useViewport();

  return (
    <div className="zoom-btn-wrapper">
      <div className="menu-wrapper">
        
      </div>
      <span>{Math.round(zoom * 100)}%</span>
      <ArrowDown />
    </div>
  );
}