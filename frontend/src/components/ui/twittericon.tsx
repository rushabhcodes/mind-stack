import React from "react";

export const TwitterIcon = ({ size = 24 }) => (
  // X (Twitter) new logo SVG
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    // stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <rect width="24" height="24" fill="none" />
    <path
      d="M7 3h3.2l3.8 5.5L18.5 3H21l-6.6 9.2L21 21h-3.2l-4.1-6-4.2 6H3l6.7-9.3L3 3h4z"
      fill="currentColor"
    />
  </svg>
);