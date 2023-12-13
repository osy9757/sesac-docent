import { Outlet } from "react-router-dom";

import { Header } from "pages/layout/components/Header";
import { Footer } from "pages/layout/components/Footer";
import { useEffect } from "react";
import api from "apis/api";
import { useDispatch } from "react-redux";
import { login } from "store/features/auth-slice";
import { useAppSelector } from "store/store";

const RootLayout = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.authReducer);
  console.log(state.userId);

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
