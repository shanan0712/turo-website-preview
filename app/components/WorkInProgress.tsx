"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";

const screens = [
  {
    category: "MOVE",
    title: "Start with a goal.",
    detail: "Choose your activity and let Turó guide every step.",
    image: "/Images/website/move-goal.png",
    imageWidth: 1078,
    imageHeight: 1459,
    deviceBounds: { x: 166, y: 18, width: 747, height: 1418 },
    alt: "Turó activity goal screen",
  },
  {
    category: "MOVE",
    title: "Explore new routes.",
    detail: "Discover new routes and places to move, explore and stay active.",
    image: "/Images/website/explore-new-routes.png",
    imageWidth: 851,
    imageHeight: 1849,
    deviceBounds: { x: 37, y: 140, width: 782, height: 1577 },
    alt: "Turó route discovery screen",
  },
  {
    category: "MOVE",
    title: "Stay consistent.",
    detail: "Build simple habits and keep moving towards your goals.",
    image: "/Images/website/stay-consistent.png",
    imageWidth: 1078,
    imageHeight: 1459,
    deviceBounds: { x: 168, y: 16, width: 744, height: 1422 },
    alt: "Turó activity progress screen",
  },
];

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");
const formatNumber = (number: number) => String(number).padStart(2, "0");
const phoneAspectRatio = 0.55;
const visibleDeviceWidth = 85;
const visibleDeviceHeight = 91;

type Screen = (typeof screens)[number];

function WorkInProgressSlide({
  screen,
  index,
  activeIndex,
}: {
  screen: Screen;
  index: number;
  activeIndex: number;
}) {
  const distance = Math.abs(index - activeIndex);
  const proximity = distance === 0 ? "is-active" : distance === 1 ? "is-near" : "is-far";
  const imageWidthPercent = Math.min(
    (visibleDeviceWidth * screen.imageWidth) / screen.deviceBounds.width,
    (visibleDeviceHeight * screen.imageWidth) / (phoneAspectRatio * screen.deviceBounds.height),
  );
  const imageHeightPercent =
    imageWidthPercent * (screen.imageHeight / screen.imageWidth) * phoneAspectRatio;
  const imageStyle: CSSProperties = {
    position: "absolute",
    width: `${imageWidthPercent}%`,
    height: "auto",
    maxWidth: "none",
    left: `${50 - ((screen.deviceBounds.x + screen.deviceBounds.width / 2) / screen.imageWidth - 0.5) * imageWidthPercent}%`,
    top: `${50 - ((screen.deviceBounds.y + screen.deviceBounds.height / 2) / screen.imageHeight - 0.5) * imageHeightPercent}%`,
    objectFit: "contain",
    objectPosition: "center",
    transform: "translate(-50%, -50%)",
    userSelect: "none",
  };

  return (
    <div
      className={`workInProgressSlide ${proximity}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${formatIndex(index)} of ${formatNumber(screens.length)}: ${screen.title}`}
      aria-current={index === activeIndex ? "true" : undefined}
      style={{ opacity: distance === 0 ? 1 : Math.max(0.12, 0.45 / distance) }}
    >
      <div className="workInProgressPhone">
        <Image
          src={screen.image}
          alt={screen.alt}
          width={screen.imageWidth}
          height={screen.imageHeight}
          sizes="(max-width: 520px) 170px, (max-width: 900px) 180px, 200px"
          style={imageStyle}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function WorkInProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    startIndex: 0,
    moved: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screens[activeIndex];

  const scrollToScreen = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelectorAll<HTMLElement>(".workInProgressSlide")[index];
    if (!track || !slide) return;

    const scrollDelta =
      slide.getBoundingClientRect().left +
      slide.clientWidth / 2 -
      (track.getBoundingClientRect().left + track.clientWidth / 2);
    track.scrollTo({
      left: track.scrollLeft + scrollDelta,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const handleTrackScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    track.querySelectorAll<HTMLElement>(".workInProgressSlide").forEach((slide, index) => {
      const slideCenter = slide.getBoundingClientRect().left + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - trackCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      startIndex: activeIndex,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < 6) return;

    if (!drag.moved) event.currentTarget.setPointerCapture(event.pointerId);
    drag.moved = true;
    event.currentTarget.scrollLeft = drag.startScrollLeft - delta;
    event.preventDefault();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    if (drag.moved) {
      const direction = event.clientX < drag.startX ? 1 : -1;
      const targetIndex = Math.max(0, Math.min(screens.length - 1, drag.startIndex + direction));
      setActiveIndex(targetIndex);
      scrollToScreen(targetIndex);
    }

    drag.pointerId = -1;
  };

  return (
    <section className="workInProgressSection" aria-label="Work in progress: Turó product experience">
      <div className="workInProgressContent">
        <p className="eyebrow workInProgressEyebrow">WORK IN PROGRESS</p>

        <div
          className="workInProgressTrack"
          ref={trackRef}
          onScroll={handleTrackScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="group"
          aria-label="Turó product screens. Swipe or scroll horizontally to explore."
        >
          <div className="workInProgressRail">
            {screens.map((screen, index) => (
              <WorkInProgressSlide
                key={screen.image}
                screen={screen}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        <div className="workInProgressStory" aria-live="polite">
          <p className="workInProgressCategory">
            {formatIndex(activeIndex)} <span aria-hidden="true">—</span> {activeScreen.category}
          </p>
          <h2>{activeScreen.title}</h2>
          <p className="workInProgressDetail">{activeScreen.detail}</p>
        </div>

        <div
          className="workInProgressTimeline"
          role="progressbar"
          aria-label="Product story progress"
          aria-valuemin={1}
          aria-valuemax={screens.length}
          aria-valuenow={activeIndex + 1}
          aria-valuetext={`${formatIndex(activeIndex)} of ${formatNumber(screens.length)}`}
        >
          <span aria-current={activeIndex === 0 ? "step" : undefined}>01</span>
          <div
            className="workInProgressTimelineTrack"
            data-active-index={activeIndex}
            aria-hidden="true"
          />
          <span aria-current={activeIndex === 1 ? "step" : undefined}>02</span>
          <span aria-current={activeIndex === 2 ? "step" : undefined}>{formatNumber(screens.length)}</span>
        </div>
      </div>
    </section>
  );
}
