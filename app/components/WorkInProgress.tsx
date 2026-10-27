"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { PointerEvent, UIEvent, WheelEvent } from "react";
import { useRef, useState } from "react";

const screens = [
  {
    category: "SET",
    title: "Start with a goal.",
    detail: "Choose your activity and let Turó guide every step.",
    image: "/Images/website/move-goal.png",
    imageWidth: 1078,
    imageHeight: 1459,
    deviceBounds: { x: 166, y: 18, width: 747, height: 1418 },
    alt: "Turó activity goal screen",
  },
  {
    category: "DISCOVER",
    title: "Explore new routes.",
    detail: "Discover new routes and places to move, explore and stay active.",
    image: "/Images/website/explore-new-routes.png",
    imageWidth: 851,
    imageHeight: 1849,
    deviceBounds: { x: 37, y: 140, width: 782, height: 1577 },
    alt: "Turó route discovery screen",
  },
  {
    category: "BUILD",
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
const horizontalWheelSensitivity = 0.88;

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
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screens[activeIndex];

  const handleTrackScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const slideWidth = track.querySelector<HTMLElement>(".workInProgressSlide")?.offsetWidth ?? 0;
    const nearestIndex = slideWidth
      ? Math.min(screens.length - 1, Math.round(track.scrollLeft / slideWidth))
      : 0;
    setActiveIndex((currentIndex) => (currentIndex === nearestIndex ? currentIndex : nearestIndex));
    const timelineTrack = track.closest(".workInProgressSection")?.querySelector<HTMLElement>(
      ".workInProgressTimelineTrack",
    );
    const progress = track.scrollWidth > track.clientWidth
      ? track.scrollLeft / (track.scrollWidth - track.clientWidth)
      : 0;
    timelineTrack?.style.setProperty("--story-progress", `${progress * 100}%`);
  };

  const handleTrackWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY !== 0 && !event.shiftKey) return;

    const track = event.currentTarget;
    const lineHeight = Number.parseFloat(getComputedStyle(track).lineHeight) || 16;
    const delta = event.shiftKey && event.deltaX === 0 ? event.deltaY : event.deltaX;
    const multiplier =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? lineHeight
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? track.clientWidth
          : 1;
    const horizontalDelta = delta * multiplier;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (
      horizontalDelta === 0 ||
      (horizontalDelta < 0 && track.scrollLeft <= 0) ||
      (horizontalDelta > 0 && track.scrollLeft >= maxScrollLeft)
    ) {
      return;
    }

    event.preventDefault();
    track.scrollLeft += horizontalDelta * horizontalWheelSensitivity;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    event.currentTarget.scrollLeft = drag.startScrollLeft - delta;
    event.preventDefault();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    drag.pointerId = -1;
  };

  return (
    <section
      className="workInProgressSection"
      aria-label="Work in progress: Turó product experience"
    >
      <div className="workInProgressContent">
        <p className="eyebrow workInProgressEyebrow">WORK IN PROGRESS</p>

        <div
          className="workInProgressTrack"
          ref={trackRef}
          onScroll={handleTrackScroll}
          onWheel={handleTrackWheel}
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
            aria-hidden="true"
          />
          <span aria-current={activeIndex === 1 ? "step" : undefined}>02</span>
          <span aria-current={activeIndex === 2 ? "step" : undefined}>{formatNumber(screens.length)}</span>
              </div>
              </div>
    </section>
  );
}
