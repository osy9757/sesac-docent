import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "pages/home/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import RootLayout from "pages/layout/RootLayout";
import AdminLayout from "pages/layout/AdminLayout";
import AdminPost from "pages/admin/AdminPost";
import AdminPiece from "pages/admin/AdminPiece";
import AdminHome from "pages/admin/AdminHome";
import AdminUser from "pages/admin/AdminUser";
import AdminExhibition from "pages/admin/AdminExhibition";
import AdminGallery from "pages/admin/AdminGallery";
import AdminArtist from "pages/admin/AdminArtist";
import AdminInquiry from "pages/admin/AdminInquiry";
import MyInfo from "pages/auth/MyInfo";
import Notice from "pages/notices/PostsTable"
import { Provider } from "react-redux";
import { ReduxProvider } from "store/provider";
import FindPassword from "pages/auth/FindPassword";
import NoticeBoard from "pages/board/NoticeBoard";

const adminRoutes = [
  { name: "user", component: <AdminUser /> },
  { name: "post", component: <AdminPost /> },
  { name: "gallery", component: <AdminGallery /> },
  { name: "exhibition", component: <AdminExhibition /> },
  { name: "artist", component: <AdminArtist /> },
  { name: "piece", component: <AdminPiece /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "myinfo", element: <MyInfo /> },
      { path: "notice", element: <Notice /> },
      { path: "findPassword", element: <FindPassword /> },
      { path: "notice", element: <NoticeBoard /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      {
        path: "inquiry",
        element: <AdminInquiry />,
        children: [
          { path: ":inqCate/page/:pageNumber", element: <AdminInquiry /> },
        ],
      },
      ...adminRoutes.map(({ name, component }) => ({
        path: name,
        element: component,
        children: [
          {
            path: "page/:pageNumber",
            element: component,
          },
        ],
      })),
    ],
  },
]);

const App = () => {
  return (
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
};

export default App;
