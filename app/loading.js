"use client";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BeatLoader  color="#36d7b7" size={20} />
    </div>
  );
}
