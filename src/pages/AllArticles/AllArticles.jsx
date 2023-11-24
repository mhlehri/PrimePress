import Search from "../../components/Search/Search";
import Card from "../../components/card/Card";
import Selects from "../../shared/Selects/Selects";

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
  return (
    <div>
      <div className="my-12 grid grid-cols-3">
        <Selects options={options} />
        <br />
        <Search />
      </div>
      <Card></Card>
    </div>
  );
};

export default AllArticles;
