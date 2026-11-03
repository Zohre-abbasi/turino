import HomePage from "../components/templates/HomePage";
import { getTours } from "../services/tourService";
import styles from "../styles/Home.module.css";

function Home({ initialTours }) {
  return (
    <div className={styles.container}>
      <HomePage initialTours={initialTours} />
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
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        initialTours: [],
      },
      revalidate: 3600,
    };
  }
}
