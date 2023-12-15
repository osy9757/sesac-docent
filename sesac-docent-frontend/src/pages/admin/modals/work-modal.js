import { X } from "lucide-react";
import { ModalLayout } from "./modal-layout";
import { useDispatch } from "react-redux";
import { closeModal } from "store/features/modal-slice";
import { add } from "apis/requests";

export const WorkModal = () => {
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const gallery_id = event.target.galleryId.value;
    const exhibition_id = event.target.exhibitionId.value;
    const author_id = event.target.authorId.value;
    const wokr_title = event.target.workTitle.value;
    const work_description = event.target.workDescription.value;
    const work_year = event.target.workYear.value;
    const work_size = event.target.workSize.value;

    const work_url_file = event.target.workUrl.files[0];
    const work_base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(work_url_file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
    const body = {
      gallery_id,
      exhibition_id,
      author_id,
      wokr_title,
      work_description,
      work_year,
      work_size,
      work_base64,
    };

    const response = await add("work", body);
    console.log(body);
    dispatch(closeModal());
  };

  return (
    <ModalLayout>
      <div className="h-full w-full flex flex-col items-center bg-white rounded-xl px-10 py-16">
        <div className="w-full flex">
          <p className="w-1/5"></p>
          <p className="w-3/5 text-3xl font-semibold text-center">작품 CRUD</p>
          <div className="w-1/5 flex justify-end">
            <button onClick={() => dispatch(closeModal())}>
              <X size={30} />
            </button>
          </div>
        </div>
        <div className="h-full w-full p-5">
          <form
            className="flex flex-col gap-4 h-full w-full p-5 px-40"
            onSubmit={submitHandler}
          >
            <INPUT label="갤러리 ID" name="galleryId" />
            <INPUT label="전시 ID" name="exhibitionId" />
            <INPUT label="작가 ID" name="authorId" />
            <INPUT label="작품 제목" name="workTitle" />
            <INPUT label="작품 설명" name="workDescription" />
            <INPUT label="제작년도" name="workYear" />
            <INPUT label="작품 크기" name="workSize" />
            <INPUT label="이미지" name="workUrl" type="file" />
            <div>
              <div className="flex gap-4 justify-end">
                <button className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition">
                  등록
                </button>
              </div>
            </div>
          </form>
        </div>

        <div></div>
      </div>
    </ModalLayout>
  );
};

const INPUT = ({ label, type, name }) => {
  return (
    <div className="flex gap-2 w-full">
      <label className="h-12 px-4 py-2 w-1/6 border border-black text-lg font-semibold text-center">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="h-12 px-4 py-2 w-5/6 border border-black bg-transparent"
      ></input>
    </div>
  );
};
