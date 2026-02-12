"use client";

let channel: BroadcastChannel | null = null;

export function getBookmarkChannel() {
  if (typeof window === "undefined") return null;

  if (!channel) {
    channel = new BroadcastChannel("bookmark-sync");
  }

  return channel;
}
