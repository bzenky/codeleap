import { SpinnerGap } from "@phosphor-icons/react";

export function Loading() {
  return (
    <div className="absolute z-10 flex justify-center items-center backdrop-blur-sm inset-0 bg-black/20">
      <SpinnerGap size={32} className="animate-spin" />
    </div>
  )
}