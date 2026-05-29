"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // fade in
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colorMap = {
    success: "text-green-400",
    error: "text-red-400",
    info: "text-blue-400",
  };

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <span
        className={`${colorMap[type]} bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg`}
      >
        {message}
      </span>
    </div>
  );
}
