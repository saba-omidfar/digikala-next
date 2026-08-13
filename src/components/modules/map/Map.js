"use client";

import { useEffect, useRef } from "react";

import maplibregl from "maplibre-gl";

export default function Map({ mapRef, initialCenter, onMove }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",

      center: [initialCenter.lng, initialCenter.lat],

      zoom: initialCenter.zoom,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("moveend", () => {
      const center = map.getCenter();

      onMove?.({
        lng: center.lng,
        lat: center.lat,
        zoom: map.getZoom(),
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [initialCenter, mapRef, onMove]);

  return <div ref={containerRef} className="map_container" />;
}
