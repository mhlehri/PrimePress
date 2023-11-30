import CountUp from "react-countup";
import useUsers from "../../hooks/useUsers";

const Stats = () => {
  const { data } = useUsers();
  const premium = data?.filter((pre) => pre?.Premium === true).length;

  return (
    <section className="p-6 my-20 w-3/5 text-center mx-auto bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] rounded-lg text-white  font-black">
      <h1 className="text-center text-3xl mb-2">All Our Members</h1>
      <div className="container mx-auto grid justify-center text-center sm:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6 drop-shadow-2xl">
          <p className="text-4xl font-bold  lg:text-6xl">
            <CountUp end={data?.length} duration={15} />
          </p>
          <p className="text-sm sm:text-md lg:text-xl">Total</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold  lg:text-6xl">
            <CountUp end={data?.length - premium} duration={15} />
          </p>
          <p className="text-sm sm:text-md lg:text-xl">Basic</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6 text-[#ffc232]">
          <p className="text-4xl font-bold  lg:text-6xl ">
            <CountUp end={premium} duration={15} />
          </p>
          <p className="text-sm sm:text-md lg:text-xl ">Premium</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
