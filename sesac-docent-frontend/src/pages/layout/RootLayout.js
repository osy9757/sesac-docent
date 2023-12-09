import { Outlet } from "react-router-dom";

import { Header } from "pages/layout/components/Header";
import { Footer } from "pages/layout/components/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
