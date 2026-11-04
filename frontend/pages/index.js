import HomePage from "../components/templates/HomePage";
import { getTours } from "../services/tourService";
import styles from "../styles/Home.module.css";

function Home({ initialTours, initialToursError }) {
  return (
    <div className={styles.container}>
      <HomePage
        initialTours={initialTours}
        initialToursError={initialToursError}
      />
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const initialTours = await getTours();

    return {
      props: {
        initialTours,
        initialToursError: false,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching initial tours:", error);

    return {
      props: {
        initialTours: [],
        initialToursError: true,
      },
      revalidate: 3600,
    };
  }
}
