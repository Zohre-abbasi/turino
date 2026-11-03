import Banner from "../modules/Banner";
import TourSearch from "../modules/TourSearch";
import TourList from "../modules/TourList";
import useTourSearch from "../../hooks/useTourSearch";

function HomePage({ initialTours }) {
  const searchProps = useTourSearch(initialTours);

  const { filteredTours, isLoading, isError, error } = searchProps;

  return (
    <>
      <Banner />
      <TourSearch {...searchProps} />

      {isLoading && <p>در حال دریافت تورها...</p>}

      {isError && <p>{error?.message || "خطا در دریافت تورها"}</p>}

      {!isLoading && !isError && <TourList tours={filteredTours || []} />}
    </>
  );
}

export default HomePage;
