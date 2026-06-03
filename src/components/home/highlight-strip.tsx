"use client";
import { LINE, BLUE } from "@/lib/colors";

const items = [
  "Free Demo First",
  "You Own Your Site",
  "One-Time Pricing",
  "Fast Turnaround",
  "SEO Optimized",
  "AI Search Ready",
];

// Duplicate for seamless loop
const track = [...items, ...items, ...items];

export default function HighlightStrip() {
  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: `1px solid ${LINE}`, background: BLUE }}
    >
      <div
        className="group flex"
        style={{ padding: "14px 0" }}
      >
        <div className="flex animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase text-white"
            >
              <span className="block h-1 w-1 rounded-full bg-white/55" />
              {item}
            </span>
          ))}
        </div>
        <div
          className="flex animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {track.map((item, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase text-white"
            >
              <span className="block h-1 w-1 rounded-full bg-white/55" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
