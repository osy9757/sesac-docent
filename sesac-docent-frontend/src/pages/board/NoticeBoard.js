import PostEditor from "components/PostEditor/PostEditor";

const NoticeBoard = () => {
  return (
    <div className="w-full h-[2000px] flex justify-center">
      <div className="flex flex-col max-w-[1300px]">
        <h1>공지사항 게시판</h1>
        <PostEditor />
      </div>
    </div>
  );
};

export default NoticeBoard;
