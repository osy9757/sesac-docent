import ReactQuill from "react-quill";
import { useState } from "react";

import "./Write.css";
import api from "apis/api";

const modules = {
  toolbar: {
    container: [
      ["image"],
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "underline"],
    ],
  },
};

export const Write = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const response = await api.post("/posts/insert", {
      title,
      content,
      category: 1,
    });
    console.log(response);
    console.log(response.data);
  };

  return (
    <>
      <div className="quill-container w-full flex flex-col gap-4">
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
    </>
  );
};
