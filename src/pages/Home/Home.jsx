import Carousels from "../../components/Carousel/Carousel";
import PriceCard from "../../components/PriceCard/PriceCard";
import Cards from "../../components/card/Card";
import Tables from "../../components/table/Table";

const Home = () => {
  return (
    <div>
      <h1 className="text-6xl">home</h1>
      <Cards></Cards>
      <Tables></Tables>
      <PriceCard></PriceCard>
      <Carousels></Carousels>
    </div>
  );
};

export default Home;
