import SideContent from "../../components/SideContent/SideContent";

const Details = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div>
            <img src="" alt="" />
            <div>
              <h5 className="text-3xl font-semibold">Title</h5>
              <p></p>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 ">
          <SideContent />
        </div>
      </div>
    </div>
  );
};

export default Details;
