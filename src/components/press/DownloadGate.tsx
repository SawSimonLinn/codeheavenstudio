"use client";

import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DownloadGateProps {
  label: string;
  fileName: string;
  downloadName: string;
  /** Human-readable name sent in the notification email */
  assetName?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function DownloadGate({ label, fileName, downloadName, assetName }: DownloadGateProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  function handleOpen() {
    setEmail("");
    setError("");
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // Notify the server (fire-and-forget — download proceeds regardless)
    fetch("/api/press/download-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), asset: assetName ?? downloadName }),
    }).catch(() => {/* ignore */});
    // Trigger the hidden anchor download
    linkRef.current?.click();
    setLoading(false);
    setOpen(false);
    setEmail("");
    setError("");
  }

  return (
    <>
      {/* Hidden download anchor */}
      <a
        ref={linkRef}
        href={`/${fileName}`}
        download={downloadName}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      <Button
        variant="outline"
        className="rounded-full w-fit"
        onClick={handleOpen}
      >
        <Download className="h-4 w-4 mr-2" />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter your email to download</DialogTitle>
            <DialogDescription>
              We&apos;ll send you a copy of <strong>{downloadName}</strong> and
              you&apos;ll be added to our press list.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="press-email">Email address</Label>
              <Input
                id="press-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
