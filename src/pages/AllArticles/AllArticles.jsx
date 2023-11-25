import Search from "../../components/Search/Search";
import { Card, CardP } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Selects from "../../shared/Selects/Selects";
import { useQuery } from "@tanstack/react-query";
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

const AllArticles = () => {
  const axiosP = useAxiosPublic();
  const {
    isPending,
    error,
    data: articlesData,
  } = useQuery({
    queryKey: ["allarticles"],
    queryFn: async () => {
      const res = await axiosP.get("/articles");
      return res.data;
    },
  });
  return (
    <div>
      <div className="my-12 grid grid-cols-3">
        <Selects options={options} />
        <br />
        <Search />
      </div>
      {isPending ? (
        ""
      ) : (
        <div className="grid grid-cols-2 gap-5 my-20">
          {articlesData?.map((data, index) => {
            return data.category == "premium" ? (
              <CardP data={data}></CardP>
            ) : (
              <Card data={data}></Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllArticles;
