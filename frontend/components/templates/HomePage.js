import { useEffect } from "react";
import { useRouter } from "next/router";

import useTourSearch from "../../hooks/useTourSearch";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import Banner from "../modules/Banner";
import TourSearch from "../modules/TourSearch";
import TourList from "../modules/TourList";
import ContactBanner from "../modules/ContactBanner";
import WhyTurino from "../modules/WhyTurino";

function HomePage({ initialTours, initialToursError }) {
  const searchProps = useTourSearch(initialTours);
  const router = useRouter();

  const { filteredTours, isLoading, isError, error } = searchProps;

  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (!isOnline || initialToursError) {
      router.replace("/server-error");
      return;
    }

    const status = error?.response?.status;

    if (isError && (!error?.response || status >= 500)) {
      router.replace("/server-error");
    }
  }, [isOnline, initialToursError, isError, error, router]);

  if (
    !isOnline ||
    initialToursError ||
    (isError && (!error?.response || error?.response?.status >= 500))
  ) {
    return null;
  }
  return (
    <>
      <Banner />
      <TourSearch {...searchProps} />

      {isLoading && <p>در حال دریافت تورها...</p>}

      {isError && <p>{error?.message || "خطا در دریافت تورها"}</p>}

      {!isLoading && !isError && <TourList tours={filteredTours || []} />}
      <ContactBanner />
      <WhyTurino/>
    </>
  );
}

export default HomePage;
