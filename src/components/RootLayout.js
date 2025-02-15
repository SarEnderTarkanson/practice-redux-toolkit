import { Outlet } from "react-router-dom";
import NavBarPanel from "./NavBarPanel";

const RootLayout = () => {
  return (
    <>
      <NavBarPanel />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
