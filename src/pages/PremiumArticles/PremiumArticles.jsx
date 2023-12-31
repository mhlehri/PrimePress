import Search from "../../components/Search/Search";
import { Card } from "../../components/card/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "./../../components/Skeleton/Skeleton";
import { useState } from "react";
import Select from "react-select";
import useAllPublishers from "../../hooks/useAllPublishers";
import { useEffect } from "react";

const options = [
  { value: "", label: "All Tags" },
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];

const PremiumArticles = () => {
  useEffect(() => {
    window.document.title = "PrimePress | All Articles";
  }, []);
  const { data: publishers } = useAllPublishers();
  const options1 = [{ value: "", label: "All Publishers" }];
  publishers?.map((p) => {
    options1.push({ value: p.publisher, label: p.publisher });
  });
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "All Tags",
  });
  const [selectedOption1, setSelectedOption1] = useState({
    value: "",
    label: "All Publisher",
  });

  const [search, setSearch] = useState("");
  const getArticles = async (page) => {
    const res = await fetch(
      `https://server12-two.vercel.app/premium?limit=10&page=${page}&tags=${selectedOption.value}&publisher=${selectedOption1.value}&search=${search}`
    );
    return res.json();
  };
  const { isPending, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinity", selectedOption, selectedOption1, search],
    queryFn: ({ pageParam = 1 }) => getArticles(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length == 10 ? pages.length + 1 : undefined;
    },
  });

  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page];
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "black" : provided.borderColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundImage: state.isSelected
        ? "linear-gradient(to top right, #58bfff , #01bea5)"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };
  const handleSubmit = (e) => {
    console.log(e.target.value);
    setSelectedOption({
      value: "",
      label: "All Tags",
    });
    setSelectedOption1({
      value: "",
      label: "All Tags",
    });
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="my-12 grid grid-cols-1 lg:grid-cols-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select
            styles={customStyles}
            value={selectedOption}
            required
            placeholder="Filter tags"
            onChange={setSelectedOption}
            options={options}
          />
          <Select
            styles={customStyles}
            value={selectedOption1}
            required
            placeholder="Filter publishers"
            onChange={setSelectedOption1}
            options={options1}
          />
        </div>
        <br />
        <Search handleSubmit={handleSubmit} />{" "}
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-20">
          <Skeleton />
          <Skeleton />
        </div>
      ) : articles?.length ? (
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-20">
              <Skeleton />
              <Skeleton />
            </div>
          }
        >
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {articles?.map((data, inx) => {
                return <Card data={data} key={inx}></Card>;
              })}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <div className="h-[50vh] w-full flex flex-col justify-center items-center ]">
          <h1 className="text-9xl font-extrabold text-black tracking-widest">
            404
          </h1>
          <div className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-white px-2 text-sm rounded rotate-12 absolute">
            Data Not Found
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumArticles;
