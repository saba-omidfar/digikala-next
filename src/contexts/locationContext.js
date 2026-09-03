"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { fromLonLat } from "ol/proj";

import { useGeoMap, useReversGeoMap } from "@/hooks/useMap";
import { useModal } from "@/contexts/modalContext";

const DEFAULT_LOCATION = {
  lng: 51.389,
  lat: 35.6892,
  zoom: 12,
};

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const debounceRef = useRef(null);
  const mapRef = useRef(null);

  const { closeModal } = useModal();

  const {
    data: geo = [],
    isLoading: geoIsLoading,
    searchLocation: searchGeoLocation,
  } = useGeoMap();

  const { isLoading: reverseGeoIsLoading, searchLocation: searchReverseGeo } =
    useReversGeoMap();

  const [showGeoList, setShowGeoList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [mapCenter, setMapCenter] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    const storedLocation = localStorage.getItem("selected-location");

    if (!storedLocation) return;

    const parsedLocation = JSON.parse(storedLocation);

    setSelectedLocation(parsedLocation);

    setSearchValue(parsedLocation?.address || "");
  }, []);

  const updateLocation = useCallback((location) => {
    setSelectedLocation(location);

    localStorage.setItem("selected-location", JSON.stringify(location));
  }, []);

  const clearLocation = useCallback(() => {
    setSelectedLocation(null);

    setSearchValue("");

    localStorage.removeItem("selected-location");
  }, []);

  const handleSearchLocation = useCallback(
    (value) => {
      setSearchValue(value);
      setShowGeoList(true);
      clearTimeout(debounceRef.current);

      if (value.trim().length < 2) return;

      debounceRef.current = setTimeout(() => {
        searchGeoLocation({
          address: value,
          latitude: mapCenter?.lat || DEFAULT_LOCATION.lat,
          longitude: mapCenter?.lng || DEFAULT_LOCATION.lng,
        });
      }, 700);
    },
    [searchGeoLocation],
  );

  const handleSelectLocation = useCallback((location) => {
    setSearchValue(location.title);
    setShowGeoList(false);
    mapRef.current?.getView().animate({
      center: fromLonLat([location.longitude, location.latitude]),
      zoom: 15,
      duration: 1500,
    });
  }, []);

  const handleSubmitLocation = useCallback(async () => {
    const result = await searchReverseGeo({
      latitude: mapCenter.lat,
      longitude: mapCenter.lng,
    });

    if (!result) return null;

    const location = {
      ...result,
      latitude: mapCenter.lat,
      longitude: mapCenter.lng,
    };

    updateLocation(location);
    closeModal();

    return location;
  }, [mapCenter, searchReverseGeo, updateLocation]);

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, []);

  const value = useMemo(
    () => ({
      DEFAULT_LOCATION,
      showGeoList,
      setShowGeoList,
      mapRef,
      geo,
      geoIsLoading,
      searchValue,
      setSearchValue,
      selectedLocation,
      setSelectedLocation,
      mapCenter,
      setMapCenter,
      reverseGeoIsLoading,
      handleSearchLocation,
      handleSelectLocation,
      handleSubmitLocation,
      clearLocation,
    }),
    [
      geo,
      geoIsLoading,
      searchValue,
      selectedLocation,
      mapCenter,
      reverseGeoIsLoading,
      handleSearchLocation,
      handleSelectLocation,
      handleSubmitLocation,
      clearLocation,
    ],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
