"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const root = document.getElementById("home-page");
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-home-reveal]"),
    );

    elements.forEach((element) => {
      element.style.setProperty(
        "--home-reveal-delay",
        `${element.dataset.homeDelay || "0"}ms`,
      );

      if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
        element.classList.add("is-visible");
      }
    });

    root.classList.add("home-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("home-motion-ready");
    };
  }, []);

  return null;
}
