import { Outlet } from "react-router-dom";
import { NavbarWithMegaMenu } from "../shared/Nav/Nav";
import { Footer } from "../shared/Footer/Footer";

const UserLayout = () => {
  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className="min-h-[calc(100vh-65px)] pt-28  container mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserLayout;
