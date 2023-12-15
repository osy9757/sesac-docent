import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as DOMPurify from "dompurify";
import api from "apis/api";
import { DUMMY_REPLY } from "./DUMMY_REPLY";
import { Reply } from "./Reply";
import { useAppSelector } from "store/store";
import { deletePosts } from "apis/requests";
import { numberToDate } from "utils/format-date";

export const Post = ({ categoryKOR, categoryENG, categoryNUM }) => {
  const [data, setData] = useState();
  const [reply, setReply] = useState();
  const [sortType, setSortType] = useState("popular");
  const [newReply, setNewReply] = useState("");
  const params = useParams();
  const postId = params.postId;
  const navigate = useNavigate();

  const state = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    (async () => {
      console.log(`/posts/details/${postId}/${categoryNUM}`);
      const response = await api.get(`/posts/details/${postId}/${categoryNUM}`);
      setData(response.data[0]);
      setReply(response.data);

      console.log(response.data);
    })();
  }, [categoryNUM, postId]);

  const replySubmitHandler = async (event) => {
    event.preventDefault();
    console.log(newReply);
    const reply_content = event.target.newReply.value;
    const body = {
      p_user_id: state.userId,
      p_category: 4,
      p_title: "1",
      p_content: reply_content,
      p_reply_id: postId,
    };
    const response = await api.post("/posts/insert", body);
    console.log("reply submit: " + response.data);

    if (response.data) window.location.reload();
  };

  const updateHandler = () => {
    navigate(`/${categoryENG}/post/${postId}/edit`);
  };

  const deleteHandler = async () => {
    const response = await deletePosts([data.post_id]);
    if (response === "Post delete successfully") {
      navigate(`/${categoryENG}`);
    }
  };

  const showReplyWrite =
    state.role &&
    (categoryENG !== "inquiry" ||
      (categoryENG === "inquiry" && state.role === "ROLE_ADMIN"));

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 my-20 gap-4">
      {/* title 영역 */}
      <p className="text-4xl font-semibold">{categoryKOR}</p>
      {/* post 영역 */}
      <div className="w-full max-w-[1000px] px-10 py-5 rounded-xl bg-white flex flex-col justify-center items-center gap-4">
        {/* 제목영역 */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <label
                htmlFor="title"
                className="w-1/12 max-w-[1300px] h-12 px-4 py-2 text-xl font-bold flex justify-center items-center border border-black"
              >
                제목
              </label>
              <p className="border border-black w-11/12 h-12 px-4 py-2 text-xl">
                {data?.post_title}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <label
                htmlFor="title"
                className="w-1/12 max-w-[1300px] h-12 px-4 py-2 font-bold flex justify-center items-center border border-black"
              >
                글쓴이
              </label>
              <p className="border border-black w-11/12 h-12 px-4 py-2 text-xl">
                {data?.user_name}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <label
                htmlFor="title"
                className="w-1/12 max-w-[1300px] h-12 px-4 py-2 font-bold flex justify-center items-center border border-black"
              >
                작성일
              </label>
              <p className="border border-black w-11/12 h-12 px-4 py-2 text-xl">
                {data?.post_created_at && numberToDate(data?.post_created_at)}
              </p>
            </div>
          </div>
        </div>
        {/* 본문영역 */}
        <div className="w-full border border-black p-5">
          {data?.post_content && (
            <div
              style={{
                width: "100%",
                whiteSpace: "normal",
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(data?.post_content)),
              }}
            />
          )}
        </div>
        {/* 버튼영역 (글쓴이만 볼 수 있도록) */}
        {data?.user_name === state.name && (
          <div className="w-full flex justify-end gap-2">
            <button
              key={1}
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              onClick={updateHandler}
            >
              수정
            </button>
            <button
              key={2}
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-rose-500 text-rose-500 hover:text-white transition"
              onClick={deleteHandler}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {/* reply 영역 */}
      <div className="w-full max-w-[1000px] flex px-10 flex-col gap-4">
        {true && (
          <div className="flex justify-end items-center w-full">
            <button
              onClick={() => setSortType("popular")}
              className={`p-2  ${
                sortType === "popular"
                  ? "text-black font-medium"
                  : "text-zinc-400 font-normal"
              }`}
            >
              인기순
            </button>
            <p className="select-none flex items-center">┃</p>
            <button
              onClick={() => setSortType("recent")}
              className={`p-2  ${
                sortType === "recent"
                  ? "text-black font-medium"
                  : "text-zinc-400 font-normal"
              }`}
            >
              최신순
            </button>
          </div>
        )}
        {/* {true && (
          <div className="w-full flex flex-col gap-8">
            {DUMMY_REPLY.map((reply) => (
              <Reply
                key={reply.replyId}
                replyId={reply.replyId}
                username={reply.username}
                content={reply.content}
                date={reply.date}
                like={true}
                likeCountProps={0}
                myLike={true}
              />
            ))}
          </div>
        )} */}
        {data?.reply_post_content &&
          reply.map((each) => (
            <div
              className="w-full flex flex-col gap-8"
              key={each?.reply_post_created_at}
            >
              <Reply
                replyId={each?.reply_post_created_at}
                username={each?.reply_user_name}
                content={each?.reply_post_content}
                date={numberToDate(each?.reply_post_created_at)}
                like={true}
                likeCountProps={0}
                myLike={true}
              />
            </div>
          ))}
      </div>
      {/* reply write 영역 */}
      {showReplyWrite && (
        <div className="w-full max-w-[1000px] px-10 py-5 flex justify-center">
          <form
            className="w-full max-w-[1000px] p-5 border border-black flex flex-col gap-4"
            onSubmit={replySubmitHandler}
          >
            <div className="flex justify-between items-center">
              <label htmlFor="newReply" className="text-lg font-semibold pl-2">
                새 댓글
              </label>
              <button
                type="submit"
                className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              >
                입력
              </button>
            </div>
            <textarea
              name="newReply"
              className="w-full p-5 h-40 border border-zinc-300"
              placeholder="댓글을 작성하려면 로그인해주세요."
            ></textarea>
            <div className="flex justify-end"></div>
          </form>
        </div>
      )}
    </div>
  );
};
