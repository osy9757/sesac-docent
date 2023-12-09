import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "pages/layout/components/AdminHeader";
import { AdminSidebar } from "pages/layout/components/AdminSidebar";
import { cn } from "utils/tailwind-merge";

export const MenuContext = createContext();

const AdminLayout = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  const menuClickHandler = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <MenuContext.Provider value={{ menuClicked, menuClickHandler }}>
      <AdminHeader />
      <AdminSidebar />
      <div
        className={cn(
          "relative top-20 h-full overflow-scroll",
          menuClicked ? "left-[73px]" : "left-[240px]"
        )}
        style={{
          width: menuClicked ? "calc(100vw - 73px)" : "calc(100vw - 240px)",
          height: "calc(100vh - 80px)",
        }}
      >
        <Outlet />
      </div>
    </MenuContext.Provider>
  );
};

export default AdminLayout;
