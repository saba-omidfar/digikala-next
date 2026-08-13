"use client";

import { useEffect, useRef, useState } from "react";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./aiVoicePlayer.module.css";

function AiVoicePlayer() {
  const { productDetails } = useProductContext();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const audioUrl = productDetails?.ai_voice_url;

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const updateProgress = () => {
      if (!audio.duration) return;

      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const playPauseHandler = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const forwardHandler = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0);
  };

  const rewindHandler = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.max(audio.currentTime - 5, 0);
  };

  if (!productDetails?.ai_voice_url) return;

  return (
    <div>
      <div
        className={styles.ai_voice_container}
        aria-label="پخش صوتی معرفی و بررسی تخصصی"
      >
        <div className={styles.ai_voice_pill}>
          <div className="d-flex align-items-center w-100">
            <div role="button" className={styles.icon_container}>
              <div
                className={`${styles.icon} cube-font-icon`}
                data-icon-name="cube-content-ai-audio-summary"
                data-icon=""
              />
            </div>

            <div className={styles.ai_voice_title_container}>
              <div className={styles.ai_voice_title}>معرفی و بررسی تخصصی</div>

              <div className={styles.ai_voice_subtitle}>توسط هوش مصنوعی</div>
            </div>

            <div
              className="position-relative d-flex align-items-center"
              aria-label="کنترل‌های پخش صوتی"
            >
              {/* Forward */}
              <div
                className={styles.forward_icon_container}
                style={{
                  transform: hasStarted
                    ? "translateX(0%) scale(1)"
                    : "translateX(-300%) scale(0)",
                }}
              >
                <div
                  role="button"
                  aria-label="پرش ۵ ثانیه به جلو"
                  onClick={forwardHandler}
                >
                  <div className="d-flex">
                    <div
                      className={`${styles.icon} cube-font-icon`}
                      data-icon-name="cube-media-5s-forward"
                      data-icon=""
                    />
                  </div>
                </div>
              </div>

              {/* Play / Pause */}
              <div
                className={styles.play_icon_container}
                style={{
                  transform: hasStarted
                    ? "translateX(0%)"
                    : "translateX(-100%)",
                }}
              >
                <div
                  role="button"
                  aria-label={isPlaying ? "توقف" : "پخش"}
                  onClick={playPauseHandler}
                >
                  <div className={styles.play_icon} aria-hidden="false">
                    <div
                      className={`${styles.icon} cube-font-icon`}
                      data-icon-name={
                        isPlaying ? "cube-media-pause" : "cube-media-play"
                      }
                      data-icon={isPlaying ? "" : ""}
                    />
                  </div>
                </div>
              </div>

              {/* Rewind */}
              <div
                className={styles.rewind_icon_container}
                style={{
                  transform: hasStarted ? "scale(1)" : "scale(0)",
                }}
              >
                <div
                  role="button"
                  aria-label="بازگشت ۵ ثانیه"
                  onClick={rewindHandler}
                >
                  <div className="d-flex">
                    <div
                      className={`${styles.icon} cube-font-icon`}
                      data-icon-name="cube-media-5s-rewind"
                      data-icon=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ai_voice__border_detailed}></div>
        <div className={styles.ai_voice__border}></div>

        <div
          className={styles.progress__pi}
          role="progressbar"
          aria-label="پیشرفت پخش"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress)}
        >
          <div
            className={styles.progress__bar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default AiVoicePlayer;
