"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollButtons() {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const nearBottom =
        scrolled + window.innerHeight >= document.body.scrollHeight - 100;
      setShow(nearBottom || scrolled > 200);
      setAtBottom(nearBottom);
    };
    setShow(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full shadow-md"
        onClick={handleClick}
        aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
      >
        {atBottom ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
