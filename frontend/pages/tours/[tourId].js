import TourDetailsPage from "../../components/templates/TourDetailsPage";
import { getTourById } from "../../services/tourService";

function TourDetails({ tour }) {
  return <TourDetailsPage tour={tour} />;
}

export default TourDetails;

export async function getServerSideProps(context) {
  const { tourId } = context.params;

  try {
    const tour = await getTourById(tourId);

    if (!tour) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        tour,
      },
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        notFound: true,
      };
    }

    throw error;
  }
}
