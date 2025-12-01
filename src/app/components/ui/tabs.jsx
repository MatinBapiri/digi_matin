"use client";
import { useState } from "react";
import React from "react";
export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className="w-full">{children.map((child) => {
      if (child.type.name === "TabsList")
        return React.cloneElement(child, { active, setActive });
      if (child.type.name === "TabsContent")
        return active === child.props.value ? child : null;
      return child;
    })}</div>
  );
}

export function TabsList({ children, active, setActive, className = "" }) {
  return (
    <div className={`flex border-b mb-4 ${className}`}>
      {children.map((child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, active, setActive }) {
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={`flex-1 py-2 text-center font-medium border-b-2 transition ${
        isActive ? "border-red-500 text-red-600" : "border-transparent text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div>{children}</div>;
}
