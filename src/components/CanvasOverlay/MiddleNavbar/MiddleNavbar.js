import "./MiddleNavbar.css";

import { useState } from "react";
import { useStore } from "../../../store";

import { ReactComponent as AddNode } from "../../../assets/icons/MiddleNav/addNode.svg";
import { ReactComponent as SelectNode } from "../../../assets/icons/MiddleNav/move.svg";
import { ReactComponent as Scissors } from "../../../assets/icons/MiddleNav/cutConnection.svg";
import { ReactComponent as Pan } from "../../../assets/icons/MiddleNav/pan.svg";
import AddNodeBar from "./AddNodeBar/AddNodeBar";

export default function MiddleNav() {
  const activeTool = useStore((s) => s.activeTool);
  const setActiveTool = useStore((s) => s.setActiveTool);

  const toggleAddNodeMenu = useStore((s) => s.toggleAddNodeMenu);
  const showMenu = useStore((s) => s.showAddNodeMenu);
  const closeMenu = useStore((s) => s.closeAddNodeMenu);

  const [active, setActive] = useState(-1);

  return (
    <div className="middle-nav-wrapper">
      <div
        onClick={() => {
          setActiveTool(0);
          toggleAddNodeMenu();
        }}
        className={activeTool === 0 ? "active" : ""}
      >
        <AddNode />
      </div>
      <div
        onClick={() => setActiveTool(1)}
        className={activeTool === 1 ? "active" : ""}
      >
        <SelectNode />
      </div>
      <div
        onClick={() => setActiveTool(2)}
        className={activeTool === 2 ? "active" : ""}
      >
        <Scissors />
      </div>
      <div
        onClick={() => setActiveTool(3)}
        className={activeTool === 3 ? "active" : ""}
      >
        <Pan />
      </div>

      <AddNodeBar isOpen={showMenu} onClose={closeMenu}/>
    </div>
  );
}
