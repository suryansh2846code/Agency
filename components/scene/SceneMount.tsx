"use client";

import dynamic from "next/dynamic";

// WebGL is client-only — load the campus without SSR.
const CampusScene = dynamic(() => import("./CampusScene"), { ssr: false });

export default function SceneMount() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <CampusScene />
    </div>
  );
}
