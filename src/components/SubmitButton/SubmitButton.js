import "./SubmitButton.css";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";

export default function SubmitButton() {
  return (
    <div className="submit-btn-wrapper">
      <button type="submit">  
        <span>Submit</span>
        <PlayIcon className="submit-btn-icon" />
      </button>
    </div>
  );
}
