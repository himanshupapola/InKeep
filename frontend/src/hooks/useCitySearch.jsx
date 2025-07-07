import { useState, useCallback } from "react";

const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

function useCitySearch() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async (query) => {
    if (query.length < 2) {
      setCities([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://secure.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=${GEONAMES_USERNAME}&featureClass=P`
      );
      const data = await res.json();
      setCities(data.geonames || []);
    } catch (error) {
      console.error("City fetch error:", error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { cities, loading, fetchCities };
}

export default useCitySearch;
