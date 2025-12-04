import FAQ from "../components/FAQ";
import CreateOrderPage from "./users/CreateOrderPage";

const Home: React.FC = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl dark:text-gray-300 font-extrabold mb-4">
        Welcome to the Tuning Shop
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Your one-stop shop for all your car tuning needs.
      </p>
      <CreateOrderPage />
      <FAQ />
    </div>
  );
};

export default Home;
