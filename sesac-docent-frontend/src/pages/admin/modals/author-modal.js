import { X } from "lucide-react";
import { ModalLayout } from "./modal-layout";
import { useDispatch } from "react-redux";
import { closeModal } from "store/features/modal-slice";
import { add } from "apis/requests";

export const AuthorModal = () => {
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const gallery_id = event.target.galleryId.value;
    const exhibition_id = event.target.exhibitionId.value;
    const author_name = event.target.authorName.value;
    const author_description = event.target.authorDescription.value;
    const author_email = event.target.authorEmail.value;
    const author_instagram = event.target.authorInstagram.value;

    const author_url_file = event.target.authorUrl.files[0];
    const author_base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(author_url_file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
    const body = {
      gallery_id,
      exhibition_id,
      author_name,
      author_description,
      author_email,
      author_instagram,
      author_base64,
    };

    const response = await add("author", body);
    console.log(body);
    dispatch(closeModal());
  };

  return (
    <ModalLayout>
      <div className="h-full w-full flex flex-col items-center bg-white rounded-xl px-10 py-16">
        <div className="w-full flex">
          <p className="w-1/5"></p>
          <p className="w-3/5 text-3xl font-semibold text-center">작가 CRUD</p>
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
            <INPUT label="작가 이름" name="authorName" />
            <INPUT label="작가 설명" name="authorDescription" />
            <INPUT label="작가 이메일" name="authorEmail" />
            <INPUT label="작가 인스타" name="authorInstagram" />
            <INPUT label="이미지" name="authorUrl" type="file" />
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
