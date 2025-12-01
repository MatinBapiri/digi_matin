"use client";
import React from "react";

export function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
