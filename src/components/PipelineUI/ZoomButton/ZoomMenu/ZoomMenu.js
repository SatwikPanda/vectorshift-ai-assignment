import { useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import gsapInit from "../../../../animations/gsapInit";
import "./ZoomMenu.css";

export default function ZoomMenu({ isOpen, setIsOpen }) {
  const menuRef = useRef(null);
  const { zoomIn, zoomOut, zoomTo, fitView } = useReactFlow();
  const gsap = gsapInit();

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, scale: 0.95, y: 10, display: 'none' },
        { opacity: 1, scale: 1, y: 0, display: 'flex', duration: 0.2, ease: "expressive-fast-spatial" }
      );
    } else {
      gsap.to(menuRef.current, 
        { opacity: 0, scale: 0.95, y: 10, display: 'none', duration: 0.2, ease: "expressive-fast-effects" }
      );
    }
  }, [isOpen, gsap]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not trigger if typing in an input or textarea
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const isModifier = e.ctrlKey || e.metaKey;

      if (isModifier) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          zoomIn({ duration: 300 });
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut({ duration: 300 });
        } else if (e.key === '0') {
          e.preventDefault();
          zoomTo(1, { duration: 300 });
        }
      } else {
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          fitView({ duration: 300 });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, zoomTo, fitView]);

  const handleAction = (e, action) => {
    e.stopPropagation();
    action();
    setIsOpen(false);
  };

  return (
    <div className="zoom-menu-container" ref={menuRef}>
      <div className="zoom-menu-item" onClick={(e) => handleAction(e, () => zoomIn({ duration: 300 }))}>
        <span>Zoom in</span>
        <span className="zoom-menu-shortcut">⌘ +</span>
      </div>
      <div className="zoom-menu-item" onClick={(e) => handleAction(e, () => zoomOut({ duration: 300 }))}>
        <span>Zoom out</span>
        <span className="zoom-menu-shortcut">⌘ -</span>
      </div>
      <div className="zoom-menu-item" onClick={(e) => handleAction(e, () => zoomTo(1, { duration: 300 }))}>
        <span>Zoom 100%</span>
        <span className="zoom-menu-shortcut">⌘ 0</span>
      </div>
      <div className="zoom-menu-item" onClick={(e) => handleAction(e, () => fitView({ duration: 300 }))}>
        <span>Zoom to fit</span>
        <span className="zoom-menu-shortcut">D</span>
      </div>
      <div className="zoom-menu-item disabled">
        <span>Zoom to selection</span>
        <span className="zoom-menu-shortcut">F</span>
      </div>
    </div>
  );
}