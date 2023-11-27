import CountUp from "react-countup";
import useUsers from "../../hooks/useUsers";

const Stats = () => {
  const { data } = useUsers();
  console.log(data);
  const premium = data?.filter((pre) => pre?.Premium === true).length;
  console.log(premium);
  return (
    <section className="p-6 my-20 bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] rounded-lg text-black font-black">
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold  lg:text-6xl">
            <CountUp end={data?.length} duration={15} />
          </p>
          <p className="text-sm sm:text-base">All users</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold  lg:text-6xl">
            <CountUp end={data?.length - premium} duration={15} />
          </p>
          <p className="text-sm sm:text-base">Normal users</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6 text-[#ffc232]">
          <p className="text-4xl font-bold  lg:text-6xl ">
            <CountUp end={premium} duration={15} />
          </p>
          <p className="text-sm sm:text-base ">Premium users</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
