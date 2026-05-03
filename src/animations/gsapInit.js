import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

let isInitialized = false;

export default function gsapInit() {
  if (isInitialized) return gsap;

  // Registering plugins
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  // =========================
  // EXPRESSIVE — SPATIAL
  // =========================
  CustomEase.create("expressive-fast-spatial", "0.42,1.67,0.21,0.90");
  CustomEase.create("expressive-default-spatial", "0.38,1.21,0.22,1.00");
  CustomEase.create("expressive-slow-spatial", "0.39,1.29,0.35,0.98");

  // =========================
  // EXPRESSIVE — EFFECTS
  // =========================
  CustomEase.create("expressive-fast-effects", "0.31,0.94,0.34,1.00");
  CustomEase.create("expressive-default-effects", "0.34,0.80,0.34,1.00");
  CustomEase.create("expressive-slow-effects", "0.34,0.88,0.34,1.00");

  // =========================
  // STANDARD — SPATIAL
  // =========================
  CustomEase.create("standard-fast-spatial", "0.27,1.06,0.18,1.00");
  CustomEase.create("standard-default-spatial", "0.27,1.06,0.18,1.00");
  CustomEase.create("standard-slow-spatial", "0.27,1.06,0.18,1.00");

  // =========================
  // STANDARD — EFFECTS
  // =========================
  CustomEase.create("standard-fast-effects", "0.31,0.94,0.34,1.00");
  CustomEase.create("standard-default-effects", "0.34,0.80,0.34,1.00");
  CustomEase.create("standard-slow-effects", "0.34,0.88,0.34,1.00");

  gsap.defaults({
    ease: "expressive-fast-spatial",
    duration: 0.350, // 500ms baseline
  });

  isInitialized = true;
  return gsap;
}
