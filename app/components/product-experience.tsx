"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const screens = [
  {
    eyebrow: "MOVE",
    title: "Make movement your own.",
    detail: "Set a goal that fits your day and build momentum at your pace.",
    image: "/Images/website/move-goal.png",
    alt: "Turó movement goal screen",
  },
  {
    eyebrow: "EXPLORE",
    title: "Find a new way through.",
    detail: "Discover routes and places that make getting out feel easy.",
    image: "/Images/website/explore-new-routes.png",
    alt: "Turó route discovery screen",
  },
  {
    eyebrow: "EAT",
    title: "Choose with more context.",
    detail: "Understand what is in your food and make a choice that works for you.",
    image: "/Images/website/nutrition-personal.png",
    alt: "Turó nutrition screen",
  },
  {
    eyebrow: "RECOVER",
    title: "Make recovery part of it.",
    detail: "Keep hydration and the conditions around you in view.",
    image: "/Images/website/hydration-personalized.png",
    alt: "Turó personalized hydration screen",
  },
  {
    eyebrow: "CONNECT",
    title: "Keep showing up together.",
    detail: "See your progress and share the small wins along the way.",
    image: "/Images/website/stay-consistent.png",
    alt: "Turó consistency progress screen",
  },
];

export default function ProductExperience() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectScreen = useCallback((index: number) => {
    setActiveIndex(index);
    const rail = railRef.current;
    const screen = rail?.children.item(index) as HTMLElement | null;
    screen?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  return (
    <section id="product" className="productExperience" aria-label="Turó product experience">
      <div className="productExperienceIntro">
        <p className="eyebrow">One connected experience</p>
      </div>

      <div className="productExperienceFocusVisual" aria-hidden="true">
        <Image src={screens[activeIndex].image} alt="" width={720} height={1280} />
      </div>

      <div className="productExperienceGallery">
        <div className="productExperienceRail" ref={railRef} aria-label="Product screens">
          {screens.map((screen, index) => (
            <button
              className={`productExperienceScreen${index === activeIndex ? " is-active" : ""}`}
              key={screen.image}
              type="button"
              data-screen
              aria-label={`${screen.eyebrow}: ${screen.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => selectScreen(index)}
            >
              <span className="productExperienceScreenVisual">
                <Image src={screen.image} alt={screen.alt} width={720} height={1280} sizes="100px" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="productExperienceCopy" aria-live="polite">
        {screens.map((screen, index) => (
          <div
            className={`productExperienceCopyContent${index === activeIndex ? " is-visible" : ""}`}
            data-copy-visible={index === activeIndex}
            key={screen.image}
            aria-hidden={index !== activeIndex}
          >
            <p className="eyebrow">{screen.eyebrow}</p>
            <h3>{screen.title}</h3>
            <p>{screen.detail}</p>
          </div>
        ))}
      </div>

      <div className="productExperienceProgress" aria-label={`Screen ${activeIndex + 1} of ${screens.length}`}>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="productExperienceProgressTrack" aria-hidden="true">
          {screens.map((screen, index) => (
            <span className={index === activeIndex ? "is-current" : undefined} key={screen.image} />
          ))}
        </div>
        <span>{String(screens.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
