import { AdminTemplate } from "./components/AdminTemplate";

const AdminInquiry = () => {
  return (
    <AdminTemplate
      type="inquiry"
      title="새로 올라온 문의"
      buttonName="문의 게시판 보기"
    />
  );
};

export default AdminInquiry;
