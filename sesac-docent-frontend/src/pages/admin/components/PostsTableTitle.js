// import { Search } from "lucide-react";

export const PostsTableTitle = ({ title, buttonName }) => {
  return (
    <div className="w-full flex justify-between items-end px-16">
      <p className="w-1/5 text-start"></p>
      <p className="w-3/5 text-center text-4xl font-semibold">{title}</p>
      <p className="w-1/5 text-start"></p>
      {/* <div className="w-1/5 h-12 flex justify-center items-center gap-4 p-4">
        <select id="searchType" className="h-10 border border-black p-2">
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="name">글쓴이</option>
        </select>
        <div className="flex gap-2">
          <input type="text" className="h-10 border-b border-black p-1 px-4" />
          <button>
            <Search />
          </button>
        </div>
      </div> */}
    </div>
  );
};
