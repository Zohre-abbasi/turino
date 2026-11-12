import HomePage from "../components/templates/HomePage";
import { getTours } from "../services/tourService";

function Home({ initialTours, initialToursError }) {
  return (
    <div>
      <HomePage
        initialTours={initialTours}
        initialToursError={initialToursError}
      />
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  try {
    const initialTours = await getTours();

    return {
      props: {
        initialTours,
        initialToursError: false,
      },
    };
  } catch (error) {
    console.error("Error fetching initial tours:", error);

    return {
      props: {
        initialTours: [],
        initialToursError: true,
      },
    };
  }
}
