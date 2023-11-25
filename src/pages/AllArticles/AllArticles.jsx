import Search from "../../components/Search/Search";
import { Card, CardP } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Selects from "../../shared/Selects/Selects";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "./../../components/Skeleton/Skeleton";
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

const getArticles = async (page) => {
  const res = await fetch(
    `http://localhost:5000/articles?limit=10&page=${page}`
  );
  return res.json();
};

const AllArticles = () => {
  const axiosP = useAxiosPublic();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinity"],
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
        <Selects options={options} />
        <br />
        <Search />
      </div>
      {/* {isPending ? (
        ""
      ) : ( */}
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
          {articles?.map((data, index) => {
            return data.category == "premium" ? (
              <CardP data={data}></CardP>
            ) : (
              <Card data={data}></Card>
            );
          })}
        </div>
      </InfiniteScroll>
      {/* )} */}
    </div>
  );
};

export default AllArticles;
