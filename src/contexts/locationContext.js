"use client";

import { useQueryClient } from "react-query";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getGuestId,
  saveGuestLocation,
  saveUserLocation,
} from "@/services/axios/Requests/userRequests";

import { fromLonLat } from "ol/proj";

import { useGeoMap, useReversGeoMap } from "@/hooks/useMap";
import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "./UserContext";

const DEFAULT_LOCATION = {
  lng: 51.389,
  lat: 35.6892,
  zoom: 12,
};

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const debounceRef = useRef(null);
  const mapRef = useRef(null);

  const { closeModal } = useModal();
  const { user } = useUserContext();

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

    const address = {
      ...location,
      id: Date.now(),
      name: "موقعیت انتخابی",
      full_name: "",
      postal_code: "",
      telephone: "",
      mobile: "",
      city_id: location.city_id || null,
      city_name: location.city_name || location.city || "",
      state_id: location.state_id || null,
      state_name: location.state_name || location.state || "",
      district_id: null,
      support_fmcg: true,
      is_default: true,
      building_number: "",
      unit: "",
      drop_off_address_id: null,
      is_usable: true,
      is_general_location_jet_eligible: true,
      is_accurate: false,
      type: "location",
    };

    if (user?.is_logged_in) {
      await saveUserLocation({
        address: location.address,
        cityId: location.city_id,
        cityName: location.city_name || location.city,
        stateId: location.state_id,
        stateName: location.state_name || location.state,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      const guestCartId = await getGuestId();

      await saveGuestLocation({
        guestCartId,
        address,
      });
    }

    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });

    closeModal();

    return location;
  }, [
    mapCenter,
    searchReverseGeo,
    updateLocation,
    user,
    queryClient,
    closeModal,
  ]);

  const handleSubmitAddress = useCallback(
    async ({ address, city, state }) => {
      try {
        const params = new URLSearchParams({
          address,
          city,
          state,
        });

        const res = await fetch(`/api/map/geo?${params.toString()}`);

        if (!res.ok) {
          throw new Error("خطا در دریافت مختصات آدرس");
        }

        const result = await res.json();

        const location = result?.data?.addresses?.[0];

        if (!location) return null;

        const selectedAddress = {
          ...location,
          address,
          city,
          state,
        };

        updateLocation(selectedAddress);

        return selectedAddress;
      } catch (error) {
        console.error("Geo address error:", error);

        return null;
      }
    },
    [updateLocation],
  );

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
      handleSubmitAddress,
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
      handleSubmitAddress,
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
