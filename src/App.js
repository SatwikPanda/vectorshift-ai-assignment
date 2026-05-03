import { ReactFlowProvider } from "reactflow";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./components/PipelineUI/PiplelineUI";
import CanvasOverlay from "./components/CanvasOverlay/CanvasOverlay";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <ReactFlowProvider>
        <div className="">
          <div>
            {/* <PipelineToolbar /> */}
            <SubmitButton />
          </div>
          <div>
            <PipelineUI />
            <CanvasOverlay />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
