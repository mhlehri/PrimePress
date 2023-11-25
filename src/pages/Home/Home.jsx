import { useEffect, useState } from "react";
import Carousels from "../../components/Carousel/Carousel";
import ListenPodcast from "../../components/ListenPodcast/ListenPodcast";
import PriceCard from "../../components/PriceCard/PriceCard";
import BioCard from "../../components/Publisher/Publisher";
import SideContent from "../../components/SideContent/SideContent";
import Stats from "../../components/Stats/Stats";
import StayConnected from "../../components/StayConnected/StayConnected";
import Cards from "../../components/card/Card";
import Tables from "../../components/table/Table";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    window.document.title = "PrimePress | Home";
    // Check if the alert has been shown before
    const hasAlertBeenShown = sessionStorage.getItem("hasAlertBeenShown");

    if (!hasAlertBeenShown) {
      const timeoutId = setTimeout(() => {
        setShowAlert(true);
        sessionStorage.setItem("hasAlertBeenShown", "true");
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  console.log(showAlert);
  {
    showAlert ? (
      <>
        {Swal.fire({
          title: "<strong>Read <u>Premium Articles</u></strong>",
          icon: "info",
          html: `
    Buy Our <a href="/subscriptions" class="bg-teal-800 text-white rounded-lg px-2 hover:bg-orange-400 hover:text-black">Premium</a> Subscription
  `,
          showCloseButton: true,
          showConfirmButton: false,
          showCancelButton: true,
          focusConfirm: false,
        })}
      </>
    ) : (
      ""
    );
  }
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <Carousels />
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 ">
          <SideContent />
        </div>
      </div>
      <BioCard />
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
      <StayConnected />
      <ListenPodcast />
      {/* <Cards></Cards>
      <Tables></Tables> */}
    </div>
  );
};

export default Home;
