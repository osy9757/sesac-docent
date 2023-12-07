import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo_horizontal_footer.svg";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[510px] h-fit py-8 bg-black">
      <Link to="/" className="flex items-center my-4">
        <img src={LogoSvg} alt="The Hyundai Logo" />
      </Link>
      <div className="flex gap-4 mt-4">
        <Link to="#" className="text-stone-100 text-xl font-semibold">
          정기구독
        </Link>
        <Link to="#" className="text-stone-100 text-xl font-semibold">
          회사소개
        </Link>
        <Link to="#" className="text-stone-100 text-xl font-semibold">
          광고/제휴
        </Link>
        <Link to="#" className="text-stone-100 text-xl font-semibold">
          개인정보 처리방침
        </Link>
      </div>
      <p className="text-stone-500 mt-2">
        DOCENT-FRED.COM IS OPERATED BY THE HYUNDAI
      </p>
    </div>
  );
};
