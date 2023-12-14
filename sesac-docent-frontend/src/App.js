import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "pages/home/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import RootLayout from "pages/layout/RootLayout";
import AdminLayout from "pages/layout/AdminLayout";
import AdminPost from "pages/admin/AdminPost";
import AdminHome from "pages/admin/AdminHome";
import AdminUser from "pages/admin/AdminUser";
import AdminExhibition from "pages/admin/AdminExhibition";
import AdminGallery from "pages/admin/AdminGallery";
import AdminAuthor from "pages/admin/AdminAuthor";
import AdminInquiry from "pages/admin/AdminInquiry";
import MyInfo from "pages/auth/MyInfo";
// import Notice from "pages/notices/PostsTable";
import { ReduxProvider } from "store/provider";
import FindPassword from "pages/auth/FindPassword";
import NoticeWrite from "pages/board/NoticeWrite";
import NoticeBoard from "pages/board/NoticeBoard";
import NoticePost from "pages/board/NoticePost";
import InquiryBoard from "pages/board/InquiryBoard";
import InquiryPost from "pages/board/InquiryPost";
import InquiryWrite from "pages/board/InquiryWrite";
import ReviewBoard from "pages/board/ReviewBoard";
import ReviewPost from "pages/board/ReviewPost";
import ReviewWrite from "pages/board/ReviewWrite";
import NoticeUpdate from "pages/board/NoticeUpdate";
import InquiryUpdate from "pages/board/InquiryUpdate";
import ReviewUpdate from "pages/board/ReviewUpdate";
import AdminWork from "pages/admin/AdminWork";

const adminRoutes = [
  { name: "user", component: <AdminUser /> },
  { name: "post", component: <AdminPost /> },
  { name: "gallery", component: <AdminGallery /> },
  { name: "exhibition", component: <AdminExhibition /> },
  { name: "author", component: <AdminAuthor /> },
  { name: "work", component: <AdminWork /> },
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
      { path: "findPassword", element: <FindPassword /> },
      {
        path: "notice",
        children: [
          { index: true, element: <NoticeBoard /> },
          { path: "page/:pageNumber", element: <NoticeBoard /> },
          { path: "post/:postId", element: <NoticePost /> },
          { path: "post/:postId/edit", element: <NoticeUpdate /> },
          { path: "write", element: <NoticeWrite /> },
        ],
      },
      {
        path: "inquiry",
        children: [
          { index: true, element: <InquiryBoard /> },
          { path: "page/:pageNumber", element: <InquiryBoard /> },
          { path: "post/:postId", element: <InquiryPost /> },
          { path: "post/:postId/edit", element: <InquiryUpdate /> },
          { path: "write", element: <InquiryWrite /> },
        ],
      },
      {
        path: "review",
        children: [
          { index: true, element: <ReviewBoard /> },
          { path: "page/:pageNumber", element: <ReviewBoard /> },
          { path: "post/:postId", element: <ReviewPost /> },
          { path: "post/:postId/edit", element: <ReviewUpdate /> },
          { path: "write", element: <ReviewWrite /> },
        ],
      },
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
