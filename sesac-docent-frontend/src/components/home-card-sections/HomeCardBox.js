import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { HomeCardList } from "./HomeCardList";
import DUMMY_CHUN from "../../assets/dummy_chun_01.jpeg";
import DUMMY_KIM from "../../assets/dummy_kim_02.jpeg";
import DUMMY_CHOI from "../../assets/dummy_choi_03.jpeg";
import DUMMY_SHIM from "../../assets/dummy_shim_04.jpeg";

export const HomeCardBox = ({ category }) => {
  const cards = [];

  const titleMap = {
    galleries: "갤러리",
    exhibitions: "전시",
    works: "작품",
    reviews: "리뷰",
  };

  const DUMMY_CARDS = [
    {
      // src: "/assets/dummy_chun_01.jpeg",
      src: DUMMY_CHUN,
      title: "내 슬픈 전설의 22페이지",
      desc: "천경자",
      desc2: "2023-11-18~2024-01-27",
    },
    {
      // src: "/assets/dummy_kim_02.jpeg",
      src: DUMMY_KIM,
      title: "집중 탄생",
      desc: "김한나",
      desc2: "2023-11-16~2024-05-19",
    },
    {
      // src: "/assets/dummy_choi_03.jpeg",
      src: DUMMY_CHOI,
      title: "함께한 오늘",
      desc: "최지현",
      desc2: "2023-11-15~2024-10-20",
    },
    {
      // src: "/assets/dummy_shim_04.jpeg",
      src: DUMMY_SHIM,
      title: "햇살 가득한 오후",
      desc: "심주하",
      desc2: "2023-11-07~2024-03-03",
    },
  ];

  return (
    <div
      className="w-full flex flex-col border-b-2 border-black border-solid pt-16 pb-24 gap-12"
      style={
        category === "reviews" ? { border: "none" } : { border: "bottom 2px" }
      }
    >
      <div className="flex justify-between items-center">
        <p className="text-4xl font-medium">{titleMap[category]}</p>
        <Link
          to="#"
          className="flex justify-center items-center gap-1 text-black hover:text-black/60 transition"
        >
          <p className="text-xl font-normal">{titleMap[category]} 모두 보기</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <HomeCardList
        category={category}
        cards={cards}
        dummyCards={DUMMY_CARDS}
      />
    </div>
  );
};
