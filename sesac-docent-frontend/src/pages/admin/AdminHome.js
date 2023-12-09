import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AdminHome = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.pageNumber) {
      navigate("/admin/inquiry/page/1");
    }
  }, [navigate, params.pageNumber]);

  return <></>;
};

export default AdminHome;
