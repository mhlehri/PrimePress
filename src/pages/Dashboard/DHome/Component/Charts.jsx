import { Chart } from "react-google-charts";
import useAllPublishers from "../../../../hooks/useAllPublishers";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useUsers from "../../../../hooks/useUsers";
import Loading from "../../../../components/Loading/Loading";
export const options = {
  title: "Publishers' total publication",
  titleTextStyle: {
    fontSize: 32,
    color: "teal",
    backgroundColor: "red",
  },
};

export function Charts() {
  const { data: publishers } = useAllPublishers();
  const axiosP = useAxiosPublic();
  const { data: publishedArticles, isPending } = useQuery({
    queryKey: ["publishedArticles"],
    queryFn: async () => {
      const res = await axiosP.get(`/articles`);
      return res.data;
    },
  });
  //   console.log(publishers);
  //   console.log(publishedArticles);
  const data = [["Task", "Hours per Day"]];
  publishers?.map((publishers) => {
    const length = publishedArticles?.filter((articles) => {
      if (articles?.publisher == publishers?.publisher) {
        return articles;
      }
    });
    data.push([publishers?.publisher, length?.length]);
  });
  return (
    <>
      {isPending ? (
        <div className="text-center">
          loading...
          <Loading />
        </div>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          loader={<div>Loading Chart</div>}
          height={"400px"}
        />
      )}
    </>
  );
}
export const options1 = {
  title: "Users Statistics",
  titleTextStyle: {
    fontSize: 32,
    textAlign: "center",
    color: "teal",
    backgroundColor: "red",
  },
};

export function BarCharts() {
  const { data: users, isPending: barLoading } = useUsers();
  const premiumUsers = users?.filter((u) => u.Premium === true);
  const barData = [
    ["Element", "Density", { role: "style" }],
    ["Total Users", users?.length, "teal"],
    ["Basic Users", users?.length - premiumUsers?.length, "#FFCF9D"],
    ["Premium Users", premiumUsers?.length, "#FFB000"],
  ];
  console.log(premiumUsers?.length);
  console.log(users);
  return (
    <>
      {barLoading ? (
        <div className="text-center">
          loading...
          <Loading />
        </div>
      ) : (
        <Chart
          chartType="ColumnChart"
          options={options1}
          width="100%"
          loader={<div>Loading Chart</div>}
          height="400px"
          data={barData}
        />
      )}
    </>
  );
}

export const options2 = {
  title: "Articles status Statistics",
  titleTextStyle: {
    fontSize: 32,
    color: "teal",
    backgroundColor: "red",
  },
  hAxis: {
    title: "Status",
    titleTextStyle: { color: "teal" },
  },
  vAxis: { minValue: 0 },
  colors: ["teal"],
  chartArea: { width: "50%", height: "70%" },
};

export function AreaChart() {
  const axiosP = useAxiosPublic();
  const { data: articlesStatus, isPending: areaLoading } = useQuery({
    queryKey: ["articlesStatus"],
    queryFn: async () => {
      const res = await axiosP.get(`/allarticles`);
      return res.data;
    },
  });
  const status = ["pending", "declined", "approved"];
  const AreaData = [["status", "Total"]];
  status.map((status) => {
    const length = articlesStatus?.filter((s) => {
      if (s?.status == status) {
        return s;
      }
    });
    AreaData.push([status, length?.length]);
  });
  return (
    <>
      {areaLoading ? (
        <div className="text-center">
          loading...
          <Loading />
        </div>
      ) : (
        <Chart
          chartType="AreaChart"
          width="100%"
          loader={<div>Loading Chart</div>}
          height="400px"
          data={AreaData}
          options={options2}
        />
      )}
    </>
  );
}
