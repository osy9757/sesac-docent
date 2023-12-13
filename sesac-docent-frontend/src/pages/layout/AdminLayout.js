import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "pages/layout/components/AdminHeader";
import { AdminSidebar } from "pages/layout/components/AdminSidebar";
import { cn } from "utils/tailwind-merge";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/store";
import { login } from "store/features/auth-slice";
import api from "apis/api";

export const MenuContext = createContext();

const AdminLayout = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.authReducer);

  const hasValidSessionId = () => {
    const sessionId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("JSESSIONID"))
      ?.split("=")[1];

    return !!sessionId && sessionId.length > 10;
  };

  useEffect(() => {
    if (state.email || !hasValidSessionId()) {
      return;
    }

    const fetchLoginInfo = async () => {
      try {
        const response = await api.get("/user/loginBySessionId");
        const {
          email,
          username: name,
          authority: role,
          userId,
        } = response.data;
        dispatch(login({ email, name, role, userId }));
      } catch (error) {
        console.error("Error fetching login info:", error);
      }
    };

    fetchLoginInfo();
  }, [dispatch, state.email]);

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
          "relative top-20 h-full overflow-scroll bg-zinc-100",
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
