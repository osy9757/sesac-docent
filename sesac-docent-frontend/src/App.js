import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "pages/home/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import RootLayout from "pages/layout/RootLayout";
import AdminLayout from "pages/layout/AdminLayout";
import AdminSupport from "pages/admin/AdminSupport";
import AdminPost from "pages/admin/AdminPost";
import AdminPiece from "pages/admin/AdminPiece";
import AdminHome from "pages/admin/AdminHome";
import AdminUser from "pages/admin/AdminUser";
import AdminExhibition from "pages/admin/AdminExhibition";
import AdminGallery from "pages/admin/AdminGallery";
import AdminArtist from "pages/admin/AdminArtist";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "user", element: <AdminUser /> },
      { path: "support", element: <AdminSupport /> },
      { path: "post", element: <AdminPost /> },
      { path: "gallery", element: <AdminGallery /> },
      { path: "exhibition", element: <AdminExhibition /> },
      { path: "artist", element: <AdminArtist /> },
      { path: "piece", element: <AdminPiece /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
