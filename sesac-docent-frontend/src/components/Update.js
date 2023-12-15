import ReactQuill from "react-quill";
import { useEffect, useState } from "react";

import "./Update.css";
import api from "apis/api";
import { useAppSelector } from "store/store";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // 강조, 기울임, 밑줄, 취소선
      ["blockquote", "code-block"], // 인용구, 코드 블록
      [{ header: 1 }, { header: 2 }], // 제목 크기
      [{ list: "ordered" }, { list: "bullet" }], // 순서 있는 목록, 순서 없는 목록
      [{ script: "sub" }, { script: "super" }], // 아래 첨자, 위 첨자
      [{ indent: "-1" }, { indent: "+1" }], // 들여쓰기 감소, 증가
      [{ direction: "rtl" }], // 오른쪽에서 왼쪽으로 텍스트 방향
      [{ size: ["small", false, "large", "huge"] }], // 텍스트 크기
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 제목 크기
      [{ color: [] }, { background: [] }], // 텍스트 색상, 배경 색상
      [{ font: [] }], // 글꼴
      [{ align: [] }], // 정렬
      ["clean", "link", "image", "video"], // 모든 서식 제거, 링크, 이미지, 비디오 추가
    ],
  },
};

export const Update = ({ categoryKOR, categoryENG, categoryNUM }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const state = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
    (async () => {
      const response = await api.get(`/posts/details/${postId}/${categoryNUM}`);
      setTitle(response.data[0].post_title);
      setContent(response.data[0].post_content);
      console.log(response.data);
    })();
  }, [categoryNUM, postId]);

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const body = {
      post_id: postId,
      post_title: title,
      post_content: content,
    };
    const response = await api.post("/posts/update", body);
    console.log(response.data);
    navigate(`/${categoryENG}`);
  };

  return (
    <div className="w-full my-20">
      <div className="w-full h-full flex justify-center items-center flex-col gap-12">
        <p className="text-4xl font-semibold underline underline-offset-8 mt-20">
          {categoryKOR}
        </p>
        <div className="w-full flex flex-col max-w-[1000px]">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <label
                htmlFor="title"
                className="w-1/12 max-w-[1300px] h-12 px-4 py-2 text-xl font-bold flex justify-center items-center border border-black"
              >
                제목
              </label>
              <input
                id="title"
                type="text"
                onChange={handleTitleChange}
                value={title}
                className="border border-black w-11/12 h-12 px-4 py-2 text-xl"
              />
            </div>
            <ReactQuill
              style={{
                width: "100%",
                maxWidth: "1300px",
                height: "600px",
              }}
              modules={modules}
              value={content}
              onChange={setContent}
            />
          </div>
          <div className="mt-2 max-w-[1300px] w-full flex justify-end gap-2">
            <button
              style={{ marginTop: "50px" }}
              onClick={handleSubmit}
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
            >
              취소
            </button>
            <button
              style={{ marginTop: "50px" }}
              onClick={handleSubmit}
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
