import ZoomButton from "../PipelineUI/ZoomButton/ZoomButton";
import MapButton from "../PipelineUI/MapButton/MapButton";

import "./CanvasOverlay.css";
import MiddleNav from "./MiddleNavbar/MiddleNavbar";

export default function CanvasOverlay() {
  return (
    <div className="canvas-overlay">
      <div></div>
      <div>
        <MiddleNav />
      </div>
      <div>
        <MapButton />
        <ZoomButton />
      </div>
    </div>
  );
}
