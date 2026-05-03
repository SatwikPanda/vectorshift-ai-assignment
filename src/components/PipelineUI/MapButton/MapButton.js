import { useLayoutEffect } from "react";
import { useEffect } from "react";
import gsapInit from "../../../animations/gsapInit";
import { ReactComponent as MapIcon } from "../../../assets/icons/map.svg";
import { useStore } from "../../../store";
import "./MapButton.css";

export default function MapButton() {
  const toggleMiniMap = useStore((s) => s.toggleMiniMap);
  const showMiniMap = useStore((s) => s.showMiniMap);

  

  useEffect(() => {
    const gsap = gsapInit();

    // scope GSAP safely to React
    const ctx = gsap.context(() => {
      const el = document.querySelector(".react-flow__minimap");
      if (!el) return;

      // kill any running animations on this element
      gsap.killTweensOf(el);

      if (showMiniMap) {
        // ENTER animation
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            scale: 0.85,
            transformOrigin: "bottom",
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "expressive-fast-spatial",
          }
        );
      } else {
        // EXIT animation (same easing direction)
        gsap.to(el, {
          autoAlpha: 0,
          scale: 0.85,
          duration: 0.25, // slightly faster exit feels better
          ease: "expressive-fast-spatial",
        });
      }
    });

    return () => ctx.revert(); // cleanup properly
  }, [showMiniMap]);

  const handleClick = () => {
    toggleMiniMap();
  };

  return (
    <div className="mapbutton-wrapper" onClick={handleClick}>
      <div>
        <MapIcon />
      </div>
    </div>
  );
}