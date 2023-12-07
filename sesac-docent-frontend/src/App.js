import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RootLayout from "./components/layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
