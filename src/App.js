import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./components/PipelineUI/PiplelineUI";
import SubmitButton from "./components/SubmitButton/SubmitButton";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <div className="">
        <div>
          <SubmitButton />
        </div>
        <div>
          {/* <PipelineToolbar /> */}
          <PipelineUI />
        </div>
      </div>

    </div>
  );
}

export default App;
