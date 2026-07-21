"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.src =
      "https://embed.tawk.to/6a5fc712096ab21d402a93a4/1ju3238sp";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}