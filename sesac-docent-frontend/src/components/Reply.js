import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "apis/api";
import { Heart, HeartOff } from "lucide-react";

const generateRandomNumber = () => {
  const weights = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  const randomValue = Math.random() * totalWeight;

  let accumulatedWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    accumulatedWeight += weights[i];
    if (randomValue < accumulatedWeight) {
      return i;
    }
  }

  return -1;
};

export const Reply = ({
  replyId,
  username,
  content,
  date,
  // like,
  likeCountProps,
  myLike,
}) => {
  const [data, setData] = useState(null);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCountProps);
  const params = useParams();
  const postId = params.postId;
  const location = useLocation();
  const categoryENG = location.state && location.state.categoryENG;
  const categoryKOR = location.state && location.state.categoryKOR;

  const x = generateRandomNumber();

  const heartClickHandler = () => {
    if (like === true) {
      setLike(false);
      setLikeCount(likeCount - 1);
    } else {
      setLike(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="w-full max-w-[1000px] h-full rounded-xl bg-white flex flex-col justify-start items-center gap-6">
        <div className="w-full border border-black p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {/* 댓글 헤더 */}
            <div className="flex flex-col justify-center gap-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-fit h-fit p-1 px-2 border border-black text-base hover:bg-black hover:text-white transition cursor-pointer">
                  <p>댓글</p>
                </div>
                <p className="text-xl font-semibold">{username}</p>
              </div>
              <p className="text-zinc-500">{date}</p>
            </div>
            <button
              className="flex gap-2 items-center"
              onClick={heartClickHandler}
            >
              {like ? (
                <Heart
                  size={30}
                  fill="rgb(239, 68, 68)"
                  color="rgb(239, 68, 68)"
                />
              ) : (
                <Heart size={30} />
              )}
              <p className="text-lg font-mono">{x}</p>
            </button>
          </div>
          <p className="text-lg">{content}</p>
        </div>
      </div>
    </div>
  );
};
