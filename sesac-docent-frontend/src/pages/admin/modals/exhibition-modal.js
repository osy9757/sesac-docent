import { X } from "lucide-react";
import { ModalLayout } from "./modal-layout";
import { useDispatch } from "react-redux";
import { closeModal } from "store/features/modal-slice";
import { add } from "apis/requests";

export const ExhibitionModal = () => {
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const gallery_id = event.target.galleryId.value;
    const exhibition_name = event.target.exhibitionName.value;
    const exhibition_description = event.target.exhibitionDescription.value;
    const exhibition_start_date = event.target.exhibitionStartDate.value;
    const exhibition_end_date = event.target.exhibitionEndDate.value;
    const exhibition_url_file = event.target.exhibitionUrl.files[0];
    const exhibition_base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(exhibition_url_file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
    const body = {
      gallery_id,
      exhibition_name,
      exhibition_description,
      exhibition_start_date,
      exhibition_end_date,
      exhibition_base64,
    };

    const response = await add("exhibition", body);
    console.log(body);
    dispatch(closeModal());
  };

  return (
    <ModalLayout>
      <div className="h-full w-full flex flex-col items-center bg-white rounded-xl px-10 py-16">
        <div className="w-full flex">
          <p className="w-1/5"></p>
          <p className="w-3/5 text-3xl font-semibold text-center">
            갤러리 CRUD
          </p>
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
            <INPUT label="전시 이름" name="exhibitionName" />
            <INPUT label="전시 설명" name="exhibitionDescription" />
            <INPUT label="전시 시작일" name="exhibitionStartDate" />
            <INPUT label="전시 종료일" name="exhibitionEndDate" />
            <INPUT label="이미지" name="exhibitionUrl" type="file" />
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
