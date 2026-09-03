"use client";

import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import { fromLonLat, toLonLat } from "ol/proj";

export default function MapComponent({ mapRef, initialCenter, onMove }) {
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

    map.on("moveend", () => {
      const view = map.getView();
      const center = view.getCenter();

      if (!center) return;

      const [lng, lat] = toLonLat(center);

      onMove?.({
        lng,
        lat,
        zoom: view.getZoom(),
      });
    });

    return () => {
      map.setTarget(null);
      mapRef.current = null;
    };
  }, [mapRef]);

  return <div ref={containerRef} className="map_container" />;
}
