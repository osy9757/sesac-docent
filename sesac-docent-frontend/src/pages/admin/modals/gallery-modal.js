import { X } from "lucide-react";
import { ModalLayout } from "./modal-layout";
import { useDispatch } from "react-redux";
import { closeModal } from "store/features/modal-slice";
import { addGallery } from "apis/requests";

export const GalleryModal = () => {
  const dispatch = useDispatch();
  // <label>갤러리 위치</label>
  // <input></input>
  // <label>갤러리 전화번호</label>
  // <input></input>

  const submitHandler = async (event) => {
    event.preventDefault();

    const gallery_name = event.target.galleryName.value;
    const gallery_location = event.target.galleryLocation.value;
    const gallery_number = event.target.galleryNumber.value;
    const gallery_url_file = event.target.galleryUrl.files[0];
    const gallery_base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(gallery_url_file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
    const body = {
      gallery_name,
      gallery_location,
      gallery_number,
      gallery_base64,
    };

    const response = await addGallery(body);
    console.log(body);
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
            <div className="flex gap-2 w-full">
              <label className="h-12 px-4 py-2 w-1/6 border border-black text-lg font-semibold text-center">
                갤러리 이름
              </label>
              <input
                name="galleryName"
                className="h-12 px-4 py-2 w-5/6 border border-black bg-transparent"
              ></input>
            </div>
            <div className="flex gap-2 w-full">
              <label className="h-12 px-4 py-2 w-1/6 border border-black text-lg font-semibold text-center">
                갤러리 위치
              </label>
              <input
                name="galleryLocation"
                className="h-12 px-4 py-2 w-5/6 border border-black bg-transparent"
              ></input>
            </div>
            <div className="flex gap-2 w-full">
              <label className="h-12 px-4 py-2 w-1/6 border border-black text-lg font-semibold text-center">
                전화번호
              </label>
              <input
                name="galleryNumber"
                className="h-12 px-4 py-2 w-5/6 border border-black bg-transparent"
              ></input>
            </div>
            <div className="flex gap-2 w-full">
              <label className="h-12 px-4 py-2 w-1/6 border border-black text-lg font-semibold text-center">
                이미지
              </label>
              <input
                type="file"
                name="galleryUrl"
                className="h-12 px-4 py-2 w-5/6 border border-black bg-transparent"
              ></input>
            </div>
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
