import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import sanitize from "dompurify";
import api from "apis/api";
import { Heart, HeartOff } from "lucide-react";

export const Reply = ({
  replyId,
  username,
  content,
  date,
  like,
  likeCount,
  myLike,
}) => {
  const [data, setData] = useState();
  const params = useParams();
  const postId = params.postId;
  const location = useLocation();
  const categoryENG = location.state && location.state.categoryENG;
  const categoryKOR = location.state && location.state.categoryKOR;

  const heartClickHandler = () => {
    console.log("heart clicked");
  };

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="w-full max-w-[1000px] h-full rounded-xl bg-white flex flex-col justify-start items-center gap-6">
        <div className="w-full border border-black p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {/* 댓글 헤더 */}
            <div className="flex flex-col justify-center gap-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-fit h-fit p-1 px-2 border border-black text-base hover:bg-black hover:text-white transition">
                  <p>댓글 1</p>
                </div>
                <p className="text-xl font-semibold">{username}</p>
              </div>
              <p className="text-zinc-500">{date}</p>
            </div>
            <button
              className="flex gap-2 items-center"
              onClick={heartClickHandler}
            >
              {myLike ? (
                <Heart
                  size={30}
                  fill="rgb(239, 68, 68)"
                  color="rgb(239, 68, 68)"
                />
              ) : (
                <Heart size={30} />
              )}
              <p className="text-lg">{likeCount}</p>
            </button>
          </div>
          <p className="text-lg">{content}</p>
        </div>
      </div>
    </div>
  );
};