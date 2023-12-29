import { useEffect } from "react";
import { AreaChart, BarCharts, Charts } from "./Component/Charts";

const DHome = () => {
  useEffect(() => {
    window.document.title = "PP Dashboard | Home";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Charts />
        <BarCharts />
      </div>
      <AreaChart />
    </>
  );
};

export default DHome;
