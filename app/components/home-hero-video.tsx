"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { storyVideoSource } from "../lib/story-video";

const HERO_START_TIME = 30;

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialSeekAppliedRef = useRef(false);
  const [startFrameReady, setStartFrameReady] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || initialSeekAppliedRef.current) return;

    const revealStartFrame = () => {
      if (
        initialSeekAppliedRef.current &&
        video.currentTime >= HERO_START_TIME
      ) {
        setStartFrameReady(true);
      }
    };

    const seekToStart = () => {
      if (
        initialSeekAppliedRef.current ||
        video.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(video.duration) ||
        video.duration < HERO_START_TIME
      ) {
        return;
      }

      video.currentTime = HERO_START_TIME;
      initialSeekAppliedRef.current = true;
      video.removeEventListener("loadedmetadata", seekToStart);
    };

    video.addEventListener("seeked", revealStartFrame);
    video.addEventListener("loadedmetadata", seekToStart);
    seekToStart();

    return () => {
      video.removeEventListener("seeked", revealStartFrame);
      video.removeEventListener("loadedmetadata", seekToStart);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="homeHeroVideo"
        data-start-ready={startFrameReady}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/Images/website/turo-story-poster.jpg"
        aria-hidden="true"
      >
        <source src={storyVideoSource} type="video/mp4" />
      </video>
      {!startFrameReady && (
        <Image
          className="homeHeroVideoPoster"
          src="/Images/website/turo-story-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      )}
    </>
  );
}
