"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    const onDown = () => ring.classList.add("ch-cursor-ring--pressed");
    const onUp = () => ring.classList.remove("ch-cursor-ring--pressed");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="ch-cursor-dot" />
      <div ref={ringRef} className="ch-cursor-ring" />
    </>
  );
}
