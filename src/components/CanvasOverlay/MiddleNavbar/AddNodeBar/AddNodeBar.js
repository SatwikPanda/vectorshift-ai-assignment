import { useEffect, useRef } from "react";
import { useStore } from "../../../../store";
import "./AddNodeBar.css";
import gsapInit from "../../../../animations/gsapInit";

import { ReactComponent as TextInputSVG } from "../../../../assets/icons/AddNodeMenu/text-input.svg";
import { ReactComponent as FileInputSVG } from "../../../../assets/icons/AddNodeMenu/file-input.svg";

import { ReactComponent as ModifyTextSVG } from "../../../../assets/icons/AddNodeMenu/modify-text.svg";

import { ReactComponent as AddLLMSVG } from "../../../../assets/icons/AddNodeMenu/add-llm.svg";

import { ReactComponent as ImageOutputSVG } from "../../../../assets/icons/AddNodeMenu/img-output.svg";
import { ReactComponent as TextOutputSVG } from "../../../../assets/icons/AddNodeMenu/text-output.svg";

export default function AddNodeBar({ isOpen, onClose }) {
  const menuRef = useRef();
  const tl = useRef();

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

  return (
    <div
      ref={menuRef}
      className="add-node-menu"
      style={{
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div className="section-container">
        <span className="section-heading">INPUT</span>
        <div>
          {" "}
          <div className="item-svg">
            <TextInputSVG />
          </div>{" "}
          <span className="item-text">Text Input</span>{" "}
        </div>
        <div>
          {" "}
          <div className="item-svg">
            <FileInputSVG />
          </div>{" "}
          <span className="item-text">File Input</span>{" "}
        </div>
      </div>

      <div className="section-container">
        <span className="section-heading">MODIFY</span>
        <div>
          {" "}
          <div className="item-svg">
            <ModifyTextSVG />
          </div>{" "}
          <span className="item-text">Modify Text</span>{" "}
        </div>
      </div>

      <div className="section-container">
        <span className="section-heading">LLM</span>
        <div>
          {" "}
          <div className="item-svg">
            <AddLLMSVG />
          </div>{" "}
          <span className="item-text">LLM</span>{" "}
        </div>
      </div>

      <div className="section-container">
        <span className="section-heading">OUTPUT</span>
        <div>
          {" "}
          <div className="item-svg">
            <ImageOutputSVG />
          </div>{" "}
          <span className="item-text">Image Output</span>{" "}
        </div>
        <div>
          {" "}
          <div className="item-svg">
            <TextOutputSVG />
          </div>{" "}
          <span className="item-text">Text Output</span>{" "}
        </div>
      </div>
    </div>
  );
}
