"use client";
// Fixed scroll-progress bar at the very top of the viewport.
// Uses CSS scroll-driven animations (Chrome 115+) with a JS fallback.
export default function ScrollProgressBar() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress-bar"
    />
  );
}
