"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function StoryFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialSeekAppliedRef = useRef(false);
  const [nearViewport, setNearViewport] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldReduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const showFilm = nearViewport && !shouldReduceMotion;

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!showFilm || !video || initialSeekAppliedRef.current) return;

    const seekToStart = () => {
      if (
        initialSeekAppliedRef.current ||
        video.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(video.duration) ||
        video.duration < 15
      ) {
        return;
      }

      video.currentTime = 15;
      initialSeekAppliedRef.current = true;
      video.removeEventListener("loadedmetadata", seekToStart);
    };

    video.addEventListener("loadedmetadata", seekToStart);
    seekToStart();

    return () => video.removeEventListener("loadedmetadata", seekToStart);
  }, [showFilm]);

  return (
    <section ref={sectionRef} className="storyFilm" aria-labelledby="hero-title">
      {showFilm ? (
        <video
          ref={videoRef}
          className="storyFilmVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/Images/website/movement-barcelona.jpg"
          aria-hidden="true"
        >
          <source src="/Images/website/turo-story.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="storyFilmPoster">
          <Image src="/Images/website/movement-barcelona.jpg" alt="" fill sizes="100vw" />
        </div>
      )}
      <div className="storyFilmOverlay" />
      <div className="storyFilmContent sectionShell">
        <h1 id="hero-title">Simple habits<br />that compound.</h1>
        <p className="storyFilmPillars">Move. Eat. Recover. Connect.</p>
        <p className="storyFilmDescription">Inspired by Barcelona, the way you live shapes how you feel. Turó brings the everyday habits that matter into one connected experience.</p>
        <a className="storyFilmCta" href="#product">EXPLORE TURÓ <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
