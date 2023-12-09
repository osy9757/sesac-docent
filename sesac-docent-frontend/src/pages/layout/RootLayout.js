import { Outlet } from "react-router-dom";

import { Header } from "pages/layout/components/Header";
import { Footer } from "pages/layout/components/Footer";

const RootLayout = () => {
  return (
    <>
      <div className="w-full h-full bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
