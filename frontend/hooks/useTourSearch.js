import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useTours from "./useTours";
import { formatApiDate, parseApiDate } from "../utils/dateUtils";

function useTourSearch() {
  // وضعیت انتخاب مبدأ، مقصد و تاریخ
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // فیلترهایی که کاربر اعمال کرده است
  const [searchFilters, setSearchFilters] = useState({});

  const router = useRouter();

  // دریافت تمام تورها
  const { data: allTours, isLoading: isLoadingAllTours } = useTours();

  // دریافت تورهای مطابق فیلترهای اعمال‌شده
  const {
    data: filteredTours,
    isLoading,
    isError,
    error,
  } = useTours(searchFilters);

  // هماهنگ‌کردن مقادیر فرم با Queryهای آدرس صفحه
  useEffect(() => {
    if (!router.isReady || !allTours) return;

    const getQueryValue = (value) => {
      return typeof value === "string" ? value : "";
    };

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

  // ساخت فهرست مبدأها
  const origins = [
    ...new Map(
      (allTours || [])
        .filter((tour) => tour.origin)
        .map((tour) => [tour.origin.id, tour.origin]),
    ).values(),
  ];

  // محدودکردن مقصدها بر اساس مبدأ انتخاب‌شده
  const availableToursForDestinations = origin
    ? (allTours || []).filter((tour) => tour.origin?.id === origin.id)
    : allTours || [];

  // ساخت فهرست مقصدها
  const destinations = [
    ...new Map(
      availableToursForDestinations
        .filter((tour) => tour.destination)
        .map((tour) => [tour.destination.id, tour.destination]),
    ).values(),
  ];

  // ثبت جست‌وجو
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

  // حذف یک فیلتر
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

  // پیدا کردن مبدأ و مقصد فیلترهای اعمال‌شده
  const appliedOrigin = (allTours || []).find(
    (tour) => tour.origin?.id === searchFilters.originId,
  )?.origin;

  const appliedDestination = (allTours || []).find(
    (tour) => tour.destination?.id === searchFilters.destinationId,
  )?.destination;

  const hasActiveFilters = Object.keys(searchFilters).length > 0;

  // حذف تمام فیلترها
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
    filteredTours,
    isLoading,
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
