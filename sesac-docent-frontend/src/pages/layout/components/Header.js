import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LinkBox, LowerHeaderLink, UpperHeaderLink } from "./LayoutLinks";
import LogoSvg from "assets/logo_horizontal.svg";

import { cn } from "utils/tailwind-merge";
import { useAppSelector } from "store/store";

export const Header = () => {
  const [height, setHeight] = useState(95);
  const [navFixed, setNavFixed] = useState(false);
  const state = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      requestAnimationFrame(() => {
        setHeight(Math.max(95 - scrollY, 60));
        setNavFixed(scrollY <= 35 ? false : true);
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="w-full h-[36px] bg-zinc-200 flex justify-center ">
        <div className="w-full max-w-[1300px] flex justify-end items-center gap-4">
          {state.role === "ROLE_ADMIN" && (
            <UpperHeaderLink link="/admin" text="관리자" />
          )}
          {state.email && (
            <UpperHeaderLink link="/myinfo" text="회원정보 수정" />
          )}
          {state.email && <UpperHeaderLink link="/" text="로그아웃" />}
          {!state.email && <UpperHeaderLink link="/register" text="회원가입" />}
          {!state.email && <UpperHeaderLink link="/login" text="로그인" />}
        </div>
      </div>
      <div
        className={cn(
          navFixed ? "w-full block h-[160px]" : "w-full hidden h-[124px]"
        )}
      ></div>
      <div className={cn("w-full bg-white", navFixed && "fixed top-0 z-50")}>
        <div className="w-full min-h-[96px] bg-white flex justify-center border-b border-black border-solid">
          <div className="w-full max-w-[1300px] flex justify-between items-center mx-10">
            <Link to="/" className="flex items-center my-4 select-none">
              <img style={{ height }} src={LogoSvg} alt="The Hyundai Logo" />
            </Link>
            <div className="flex justify-between gap-4">
              <LinkBox link="#" text="전시 일정" color="yellow" />
              <LinkBox link="#" text="작품 정보" color="white" />
            </div>
          </div>
        </div>
        <nav className="w-full min-h-[64px] flex justify-center border-b border-black border-solid bg-white">
          <div className="w-full max-w-[1300px] flex justify-between mx-10">
            <div className="flex items-center gap-8">
              <LowerHeaderLink link="/notice" text="공지사항" />
              <LowerHeaderLink link="#" text="갤러리" />
              <LowerHeaderLink link="#" text="전시 일정" />
              <LowerHeaderLink link="#" text="작품 정보" />
              <LowerHeaderLink link="#" text="관람객 후기" />
              <LowerHeaderLink link="#" text="1:1 문의" />
            </div>
            <div className="flex items-center lg:text-lg md:text-sm">
              <p>
                <strong>운영시간: </strong>10:30 am-7:00 pm
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
