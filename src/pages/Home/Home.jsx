import { useEffect, useState } from "react";
import Carousels from "../../components/Carousel/Carousel";
import ListenPodcast from "../../components/ListenPodcast/ListenPodcast";
import PriceCard from "../../components/PriceCard/PriceCard";
import BioCard from "../../components/Publisher/Publisher";
import SideContent from "../../components/SideContent/SideContent";
import Stats from "../../components/Stats/Stats";
import StayConnected from "../../components/StayConnected/StayConnected";
import Swal from "sweetalert2";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    window.document.title = "PrimePress | Home";
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
    <div className="lg:space-y-56 mb-28 lg:px-0 px-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <Carousels />
        </div>
        <div className="lg:col-span-1"></div>
        <div className="col-span-12 lg:col-span-3 mt-4">
          <SideContent />
        </div>
      </div>
      <BioCard />
      <Stats />

      <div>
        <h1 className="text-3xl font-bold mb-5 lg:mb-12 text-center">
          Our Premium Packages
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 gap-12">
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
      </div>
      <StayConnected />
      <ListenPodcast />
    </div>
  );
};

export default Home;
