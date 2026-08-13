import { useState, useCallback } from "react";
import { useSnackbar } from "@/contexts/SnackbarContext";

export function useGeoMap() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  const searchLocation = useCallback(
    async ({ address, latitude, longitude }) => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams({
          address,
          latitude,
          longitude,
        });

        const res = await fetch(`/api/map/geo?${params.toString()}`);
        const json = await res.json();

        if (json?.status !== 200) {
          showSnackbar(json.message);
          setData([]);

          return;
        }

        setData(json?.data?.addresses ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    data,
    isLoading,
    searchLocation,
  };
}

export function useReversGeoMap() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocation = useCallback(async ({ latitude, longitude }) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        latitude,
        longitude,
      });

      const res = await fetch(`/api/map/reverse-geo?${params.toString()}`);
      const json = await res.json();

      if (json?.status !== 200) {
        showSnackbar(json.message);

        setData(null);

        return null;
      }

      const addressData = json?.data?.address ?? null;

      setData(addressData);

      return addressData;
    } catch (err) {
      console.error(err);

      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    searchLocation,
  };
}
