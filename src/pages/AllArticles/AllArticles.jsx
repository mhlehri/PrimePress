import Search from "../../components/Search/Search";
import { Card } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "./../../components/Skeleton/Skeleton";
import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "All", label: "All" },
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];
const options1 = [
  { value: "All", label: "All" },
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];

const AllArticles = () => {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedOption1, setSelectedOption1] = useState(undefined);
  const getArticles = async (page) => {
    const res = await fetch(
      `http://localhost:5000/articles?limit=10&page=${page}&filter=${
        selectedOption ? selectedOption.value : "All"
      }&publisher=${selectedOption1}`
    );
    return res.json();
  };
  const { isPending, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinity", selectedOption],
    queryFn: ({ pageParam = 1 }) => getArticles(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length == 10 ? pages.length + 1 : undefined;
    },
  });
  console.log(data);
  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page];
  }, []);
  console.log(articles);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // Change the background color
      borderColor: state.isFocused ? "black" : provided.borderColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundImage: state.isSelected
        ? "linear-gradient(to top right, #58bfff , #01bea5)"
        : "white", // Change the option background color
      color: state.isSelected ? "white" : "black", // Change the option text color
    }),
  };

  // const {
  //   isPending,
  //   error,
  //   data: articlesData,
  // } = useQuery({
  //   queryKey: ["allarticles"],
  //   queryFn: async () => {
  //     const res = await axiosP.get("/articles");
  //     return res.data;
  //   },
  // });
  return (
    <div>
      <div className="my-12 grid grid-cols-3">
        <div className="grid grid-cols-2 gap-2">
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
        <Search />
      </div>
      {isPending ? (
        <div className="grid grid-cols-2 gap-5 my-20">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={
            <div className="grid grid-cols-2 gap-5 my-20">
              <Skeleton />
              <Skeleton />
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-5 my-20">
            {articles?.map((data, inx) => {
              return <Card data={data} key={inx}></Card>;
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AllArticles;
