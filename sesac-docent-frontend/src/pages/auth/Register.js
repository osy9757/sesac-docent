import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateConfirm,
  validateNickname,
} from "../../utils/validate-input";
import { useInput } from "../../hooks/use-input";
import api from "../../apis/api";

import { SignError } from "../../components/auth/SignError";
import { SignInput } from "../../components/auth/SignInput";
import LoginImage from "../../assets/i_am_ground_wide.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);
  const confirm = useInput((value) => validateConfirm(value, password.value));
  const userName = useInput(validateNickname);
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const valid =
      email.isValid && password.isValid && confirm.isValid && userName.isValid;
    setIsValid(valid);
    setIsDuplicated(false);

    if (!valid) {
      return;
    }

    const response = await api.post("/auth/register", {
      email,
      password,
      userName,
    });
    if (response.data.message === "success") {
      navigate.push("/login");
    } else {
      if (response.data.errorCode === "email")
        setErrorMessage("이미 존재하는 이메일입니다.");
      if (response.data.errorCode === "name")
        setErrorMessage("이미 존재하는 이름입니다.");
      setIsDuplicated(true);
      setIsValid(false);
    }
    console.log(response.data.message);
  };

  return (
    <div className="flex justify-center mt-40 mb-32">
      <div className="max-w-[1600px] flex justify-between">
        <div className="w-fit py-16 flex flex-col justify-center gap-8 mx-10">
          <p className="w-fit text-7xl font-bold">회원가입</p>
          <form className="flex flex-col gap-4 w-fit sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px] border border-black p-4">
            <SignInput
              type="email"
              label="이메일 *"
              inputState={email}
              errorMessage="이메일 형식이 올바르지 않습니다."
            />
            <SignInput
              type="password"
              label="비밀번호 *"
              inputState={password}
              errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
            />
            <SignInput
              type="password"
              label="비밀번호 확인 *"
              inputState={confirm}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
            <SignInput
              type="text"
              label="이름 *"
              inputState={userName}
              errorMessage="2~16자의 한글을 입력해 주세요."
            />
            {!isValid && <SignError message="입력값을 다시 확인해주세요." />}
            {isDuplicated && <SignError message={errorMessage} />}
            <div className="flex gap-4 justify-end">
              <button
                onClick={submitHandler}
                className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-3/4">
            <img src={LoginImage} alt="I am Ground, ALT.1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;