import { useRef, useEffect } from "react";

import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: false,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          skipButtons: { forward: 10, backward: 10 },
        },
        poster,
        sources: [{ src, type: "video/mp4" }],
      }));
    } else {
      playerRef.current.src({ src, type: "video/mp4" });
    }
  }, [src]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="h-100 w-100">
      <div className="h-100 w-100" ref={videoRef} />
    </div>
  );
}
