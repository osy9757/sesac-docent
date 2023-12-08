import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo_horizontal_footer.svg";
import { FooterLink } from "./LayoutLinks";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[300px] h-fit py-8 bg-black">
      <Link to="/" className="flex items-center my-4 h-20">
        <img src={LogoSvg} alt="The Hyundai Logo" className="h-full" />
      </Link>
      <div className="flex gap-4 mt-4">
        <FooterLink link="#" text="정기구독" />
        <FooterLink link="#" text="회사소개" />
        <FooterLink link="#" text="광고/제휴" />
        <FooterLink link="#" text="개인정보 처리방침" />
      </div>
      <p className="text-stone-500 mt-2 text-sm">
        DOCENT-FRED.COM IS OPERATED BY THE HYUNDAI
      </p>
    </div>
  );
};
