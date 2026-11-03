import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useTours from "./useTours";
import { formatApiDate, parseApiDate } from "../utils/dateUtils";

function useTourSearch(initialTours = []) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});

  const router = useRouter();

  const { data: allTours = [], isLoading: isLoadingAllTours } = useTours(
    {},
    {
      initialData: initialTours,
      staleTime: 5 * 60 * 1000,
    },
  );

  const hasSearchFilters = Object.keys(searchFilters).length > 0;

  const {
    data: filteredTours,
    isLoading,
    isError,
    error,
  } = useTours(searchFilters, {
    enabled: hasSearchFilters,
  });

  useEffect(() => {
    if (!router.isReady) return;

    const getQueryValue = (value) => (typeof value === "string" ? value : "");

    const originId = getQueryValue(router.query.originId);
    const destinationId = getQueryValue(router.query.destinationId);
    const startDateValue = getQueryValue(router.query.startDate);
    const endDateValue = getQueryValue(router.query.endDate);

    const selectedOrigin =
      allTours.find((tour) => tour.origin?.id === originId)?.origin || null;

    const selectedDestination =
      allTours.find((tour) => tour.destination?.id === destinationId)
        ?.destination || null;

    setOrigin(selectedOrigin);
    setDestination(selectedDestination);
    setStartDate(parseApiDate(startDateValue));
    setEndDate(parseApiDate(endDateValue));

    setSearchFilters({
      ...(originId && { originId }),
      ...(destinationId && { destinationId }),
      ...(startDateValue && { startDate: startDateValue }),
      ...(endDateValue && { endDate: endDateValue }),
    });
  }, [router.isReady, router.query, allTours]);

  const origins = [
    ...new Map(
      allTours
        .filter((tour) => tour.origin)
        .map((tour) => [tour.origin.id, tour.origin]),
    ).values(),
  ];

  const availableToursForDestinations = origin
    ? allTours.filter((tour) => tour.origin?.id === origin.id)
    : allTours;

  const destinations = [
    ...new Map(
      availableToursForDestinations
        .filter((tour) => tour.destination)
        .map((tour) => [tour.destination.id, tour.destination]),
    ).values(),
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {
      ...(origin?.id && { originId: origin.id }),
      ...(destination?.id && { destinationId: destination.id }),
      ...(startDate && { startDate: formatApiDate(startDate) }),
      ...(endDate && { endDate: formatApiDate(endDate) }),
    };

    setSearchFilters(filters);

    router.push(
      {
        pathname: router.pathname,
        query: filters,
      },
      undefined,
      { shallow: true },
    );
  };

  const handleRemoveFilter = (filterName) => {
    const updatedFilters = { ...searchFilters };

    if (filterName === "date") {
      delete updatedFilters.startDate;
      delete updatedFilters.endDate;

      setStartDate(null);
      setEndDate(null);
    } else {
      delete updatedFilters[filterName];

      if (filterName === "originId") {
        setOrigin(null);
      }

      if (filterName === "destinationId") {
        setDestination(null);
      }
    }

    setSearchFilters(updatedFilters);

    router.push(
      {
        pathname: router.pathname,
        query: updatedFilters,
      },
      undefined,
      { shallow: true },
    );
  };

  const appliedOrigin = allTours.find(
    (tour) => tour.origin?.id === searchFilters.originId,
  )?.origin;

  const appliedDestination = allTours.find(
    (tour) => tour.destination?.id === searchFilters.destinationId,
  )?.destination;

  const hasActiveFilters = hasSearchFilters;

  const handleRemoveAllFilters = () => {
    setOrigin(null);
    setDestination(null);
    setStartDate(null);
    setEndDate(null);
    setSearchFilters({});

    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    );
  };

  return {
    origin,
    setOrigin,
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchFilters,
    allTours,
    isLoadingAllTours,
    filteredTours: hasSearchFilters ? filteredTours : allTours,
    isLoading: hasSearchFilters && isLoading,
    isError,
    error,
    origins,
    destinations,
    appliedOrigin,
    appliedDestination,
    hasActiveFilters,
    handleSearch,
    handleRemoveFilter,
    handleRemoveAllFilters,
  };
}

export default useTourSearch;
