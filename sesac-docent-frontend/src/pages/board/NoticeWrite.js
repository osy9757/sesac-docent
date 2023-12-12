// import PostEditor from "components/PostEditor/PostEditor";
import { Write } from "components/Write";
import Ground from "assets/i_am_ground.jpeg";

const NoticeWrite = () => {
  return (
    <div className="w-full my-20">
      <div className="w-full h-full flex justify-center items-center flex-col gap-12">
        {/* <img className="h-[400px]" src={Ground} alt="Ground" /> */}
        <p className="text-4xl font-semibold underline underline-offset-8 mt-20">
          공지사항
        </p>
        <div className="w-full flex flex-col max-w-[1000px]">
          <Write />
        </div>
      </div>
    </div>
  );
};

export default NoticeWrite;
