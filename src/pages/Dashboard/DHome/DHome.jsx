// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7],
// ];

import { AreaChart, BarCharts, Charts } from "./Component/Charts";

const DHome = () => {
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
