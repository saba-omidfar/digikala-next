"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressBar() {
  return (
    <ProgressBar
      height="2px"
      color="#ef4056"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
