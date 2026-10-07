"use client";

import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import { fromLonLat, toLonLat } from "ol/proj";

export default function MapComponent({
  children,
  mapRef,
  initialCenter,
  onMove,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new Map({
      target: containerRef.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      view: new View({
        center: fromLonLat([initialCenter.lng, initialCenter.lat]),
        zoom: initialCenter.zoom,
      }),
    });

    mapRef.current = map;

    const updateMapSize = () => {
      map.updateSize();
      map.renderSync();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateMapSize();
      });
    });

    const resizeObserver = new ResizeObserver(() => {
      updateMapSize();
    });

    resizeObserver.observe(containerRef.current);

    const handleMoveEnd = () => {
      const view = map.getView();
      const center = view.getCenter();

      if (!center) return;

      const [lng, lat] = toLonLat(center);

      onMove?.({
        lng,
        lat,
        zoom: view.getZoom(),
      });
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      resizeObserver.disconnect();
      map.un("moveend", handleMoveEnd);

      map.setTarget(null);
      mapRef.current = null;
    };
  }, [mapRef]);

  return (
    <div ref={containerRef} className="map_container">
      {children}
    </div>
  );
}
