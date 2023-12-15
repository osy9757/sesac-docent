import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { HomeCardList } from "./HomeCardList";
import { cn } from "utils/tailwind-merge";

export const HomeCardBox = ({ category }) => {
  const [cards, setCards] = useState([]);

  const titleMap = {
    galleries: "갤러리",
    exhibitions: "전시",
    authors: "작가",
    works: "작품",
  };

  useEffect(() => {
    fetch(`http://localhost:3000/posts/listup/${category}/10/1`)
      .then((response) => response.json())
      .then((data) => {
        // 데이터에서 무작위로 4개의 항목을 선택
        const selectedCards = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setCards(selectedCards);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [category]);

  return (
    <div
      className={cn(
        "w-full flex flex-col border-b-2 border-black border-solid pt-8 pb-20 gap-12",
        category === "reviews" ? " border-none" : "border-b-2"
      )}
    >
      <div className="flex justify-between items-center">
        <p className="text-5xl font-bold">{titleMap[category]}</p>
        <Link
          to="#"
          className="flex justify-center items-center gap-1 text-black hover:text-black/60 transition"
        >
          <p className="text-xl font-semibold">
            {titleMap[category]} 모두 보기
          </p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <HomeCardList
        cards={cards}
        category={category}
      />
    </div>
  );
};
