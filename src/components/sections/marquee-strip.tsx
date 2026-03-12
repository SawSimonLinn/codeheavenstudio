const marqueeItems = [
  "50+ Projects Delivered",
  "Free Demo First",
  "5★ Average Rating",
  "You Own Your Site",
  "One-Time Pricing",
  "Fast Turnaround",
  "Modern Tech Stack",
  "SEO Optimized",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-secondary text-secondary-foreground py-4 overflow-hidden border-y border-white/5">
      <div className="inline-flex animate-marquee whitespace-nowrap w-max">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= marqueeItems.length ? "true" : undefined}
            className="inline-flex items-center gap-3 mx-8 text-sm font-semibold tracking-wide"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
