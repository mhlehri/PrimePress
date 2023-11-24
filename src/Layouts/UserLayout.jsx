import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../shared/Nav/Nav";
import { Footer } from "../shared/Footer/Footer";

const UserLayout = () => {
  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className="min-h-[calc(100vh-65px)]  container mx-auto mt-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserLayout;
