"use client";

import { useQuery } from "@tanstack/react-query";
import iranCity from "iran-city";

export function useIranLocations() {
  return useQuery({
    queryKey: ["iran-locations"],
    queryFn: async () => {
      const provinces = iranCity.allProvinces(); // [ "تهران", "اصفهان", ... ]
      const cities = iranCity.allCities(); // [ { name: "...", province: "..." }, ... ]

      const grouped = {};

      provinces.forEach((province) => {
        grouped[province] = cities
          .filter((c) => c.province === province)
          .map((c) => c.name);
      });

      return grouped;
    },

    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
