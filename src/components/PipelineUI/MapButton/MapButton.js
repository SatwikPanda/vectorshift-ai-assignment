import { ReactComponent as MapIcon } from "../../../assets/icons/map.svg";
import "./MapButton.css";

export default function MapButton() {
  return (
    <div className="mapbutton-wrapper">
      <div>
        <MapIcon />
      </div>
    </div>
  );
}
