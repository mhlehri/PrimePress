import Carousels from "../../components/Carousel/Carousel";
import PriceCard from "../../components/PriceCard/PriceCard";
import SideContent from "../../components/SideContent/SideContent";
import Cards from "../../components/card/Card";
import Tables from "../../components/table/Table";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <Carousels></Carousels>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 mt-6">
          <SideContent></SideContent>
        </div>
      </div>
      <h1 className="text-6xl">home</h1>
      <Cards></Cards>
      <Tables></Tables>
      <PriceCard></PriceCard>
    </div>
  );
};

export default Home;
