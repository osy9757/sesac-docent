import { useState } from "react";

import { validateEmail, validateNickname } from "utils/validate-input";
import { useInput } from "hooks/use-input";
import api from "apis/api";

import { SignError } from "pages/auth/components/SignError";
import { SignInput } from "pages/auth/components/SignInput";
import LoginImage from "assets/i_am_ground_wide.jpeg";
import { Link } from "react-router-dom";

const FindPassword = () => {
  const email = useInput(validateEmail);
  const userName = useInput(validateNickname);
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const valid = email.isValid && userName.isValid;

    if (!valid) {
      setHasError(valid);
      setErrorMessage("입력 형식이 올바르지 않습니다.");
      return;
    }

    const response = await api.post("/user/findPassword", {
      email: email.value,
      username: userName.value,
    });
    if (response.status === 200) {
      console.log("이메일로 받은 새 비밀번호: ", response.data.newPassword);
      setSuccess(true);
    } else {
      setHasError(true);
      setErrorMessage(response.data.message);
    }
  };

  return (
    <div className="flex justify-center mt-24 mb-16">
      <div className="max-w-[1300px] flex justify-between">
        <div className="w-fit py-16 flex flex-col justify-center gap-8 mx-10">
          <p className="w-fit text-7xl font-bold">비밀번호 찾기</p>
          <form className="flex flex-col gap-4 w-fit sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px] border border-black p-4">
            <SignInput
              type="email"
              label="이메일 *"
              inputState={email}
              errorMessage="이메일 형식이 올바르지 않습니다."
            />
            <SignInput
              type="text"
              label="이름 *"
              inputState={userName}
              errorMessage="2~16자의 한글을 올바르게 입력해 주세요."
            />
            {hasError && <SignError message={errorMessage} />}
            {success && (
              <p className="text-lg font-medium text-teal-500">
                새 비밀번호가 메일로 전송되었습니다.
              </p>
            )}
            <div className="flex gap-4 justify-end">
              {success && (
                <Link
                  to="/login"
                  className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
                >
                  로그인
                </Link>
              )}
              <button
                onClick={submitHandler}
                className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              >
                비밀번호 찾기
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <div className="ml-24" style={{ aspectRatio: "20/13" }}>
            <img
              src={LoginImage}
              alt="I am Ground, ALT.1"
              className="h-auto object-cover w-[850px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
