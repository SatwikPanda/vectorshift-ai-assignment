import { useState, useRef, useEffect } from 'react';
import { useViewport } from "reactflow";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow_drop_down.svg"
import ZoomMenu from "./ZoomMenu/ZoomMenu";

import "./ZoomButton.css";

export default function ZoomButton() {
  const { zoom } = useViewport();
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="zoom-btn-container" ref={btnRef}>
      <div className="zoom-btn-wrapper" onClick={toggleMenu}>
        <span>{Math.round(zoom * 100)}%</span>
        <ArrowDown />
      </div>
      <ZoomMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}