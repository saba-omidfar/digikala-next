// "use client";

// import { useEffect, useRef } from "react";

// import maplibregl from "maplibre-gl";
// import "ol/ol.css";

// export default function Map({ mapRef, initialCenter, onMove }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current || mapRef.current) return;

//     const map = new maplibregl.Map({
//       container: containerRef.current,
//       style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",

//       center: [initialCenter.lng, initialCenter.lat],

//       zoom: initialCenter.zoom,
//     });

//     mapRef.current = map;

//     map.addControl(new maplibregl.NavigationControl(), "bottom-right");

//     map.on("moveend", () => {
//       const center = map.getCenter();

//       onMove?.({
//         lng: center.lng,
//         lat: center.lat,
//         zoom: map.getZoom(),
//       });
//     });

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, [initialCenter, mapRef, onMove]);

//   return <div ref={containerRef} className="map_container" />;
// }

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
