import Carousels from "../../components/Carousel/Carousel";
import PriceCard from "../../components/PriceCard/PriceCard";
import BioCard from "../../components/Publisher/Publisher";
import SideContent from "../../components/SideContent/SideContent";
import Stats from "../../components/Stats/Stats";
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
        <div className="col-span-3 ">
          <SideContent></SideContent>
        </div>
      </div>
      <BioCard></BioCard>
      <Stats />
      <div className="grid grid-cols-3 my-20 gap-4">
        <PriceCard
          colors="#0174BE"
          price={5}
          btn="Quick Package"
          duration="1 minute"
        ></PriceCard>
        <PriceCard
          colors="teal"
          price={30}
          btn="Sliver Package"
          duration="5 days"
        ></PriceCard>
        <PriceCard
          btn="Golden Package"
          colors="orange"
          price={50}
          duration="10 days"
        ></PriceCard>
      </div>
      <h1 className="text-6xl">home</h1>
      <Cards></Cards>
      <Tables></Tables>
    </div>
  );
};

export default Home;
