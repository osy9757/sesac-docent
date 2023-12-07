import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LogoSvg from "../../assets/logo_horizontal.svg";
import { IoMdPlay } from "react-icons/io";

export const Header = () => {
  const [height, setHeight] = useState(100);
  const [navFixed, setNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      requestAnimationFrame(() => {
        setHeight(Math.max(100 - scrollY * 1.5, 60));
        if (scrollY <= 35) {
          setNavFixed(false);
        } else {
          setNavFixed(true);
        }
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
          <Link
            to="/register"
            className="flex justify-center items-center gap-1 w-fit"
          >
            <IoMdPlay size={12} />
            회원가입
          </Link>
          <Link
            to="/login"
            className="flex justify-center items-center gap-1 w-fit"
          >
            <IoMdPlay size={12} />
            로그인
          </Link>
        </div>
      </div>
      <div
        className="w-full"
        style={
          navFixed
            ? { display: "block", height: "160px" }
            : { display: "none", height: "124px" }
        }
      ></div>
      <div
        className="w-full"
        style={navFixed ? { position: "fixed", top: "0" } : {}}
      >
        <div className="w-full min-h-[96px] bg-white flex justify-center border-b border-black border-solid">
          <div className="w-full max-w-[1300px] flex justify-between items-center mx-10">
            <Link to="/" className="flex items-center my-4">
              <img style={{ height }} src={LogoSvg} alt="The Hyundai Logo" />
            </Link>
            <div className="flex justify-between gap-4">
              <Link
                to="#"
                className="flex justify-center items-center w-[168px] h-[55px] border border-black border-solid bg-yellow-200 hover:bg-black text-2xl font-bold text-black hover:text-white transition"
              >
                전시 일정
              </Link>
              <Link
                to="/"
                className="flex justify-center items-center w-[168px] h-[55px] border border-black border-solid bg-white hover:bg-black text-2xl font-bold text-black hover:text-white transition"
              >
                작품 정보
              </Link>
            </div>
          </div>
        </div>
        <nav className="w-full min-h-[64px] flex justify-center border-b border-black border-solid bg-white">
          <div className="w-full max-w-[1300px] flex justify-between mx-10">
            <div className="flex items-center gap-8 font-semibold xl:text-xl lg:text-lg md:text-base">
              <Link href="#" className="hover:underline">
                공지사항
              </Link>
              <Link href="#" className="hover:underline">
                공간 소개
              </Link>
              <Link href="#" className="hover:underline">
                전시 일정
              </Link>
              <Link href="#" className="hover:underline">
                작품 정보
              </Link>
              <Link href="#" className="hover:underline">
                전문가 칼럼
              </Link>
              <Link href="#" className="hover:underline">
                관람객 후기
              </Link>
              <Link href="#" className="hover:underline">
                1:1 문의
              </Link>
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
