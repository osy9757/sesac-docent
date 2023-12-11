import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateConfirm,
  validateNickname,
  validateAuthNumber,
} from "utils/validate-input";
import { useInput } from "hooks/use-input";
import api from "apis/api";

import { SignError } from "pages/auth/components/SignError";
import { SignInput } from "pages/auth/components/SignInput";
import LoginImage from "assets/i_am_ground_wide.jpeg";
import { SignInputCheck } from "./components/SignInputCheck";

const Register = () => {
  const navigate = useNavigate();
  const email = useInput(validateEmail);
  const authNumber = useInput(validateAuthNumber);
  const password = useInput(validatePassword);
  const confirm = useInput((value) => validateConfirm(value, password.value));
  const userName = useInput(validateNickname);
  const [isValid, setIsValid] = useState(true);
  const [emailUnique, setEmailUnique] = useState(false);
  const [serverAuthNumber, setServerAuthNumber] = useState("");
  const [authNumberValid, setAuthNumberValid] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const valid =
      email.isValid && password.isValid && confirm.isValid && userName.isValid;
    setIsValid(valid);

    if (!valid) {
      return;
    }

    await api.post("/user/insert", {
      email: email.value,
      password: password.value,
      username: userName.value,
    });

    navigate("/login");
  };

  return (
    <div className="flex justify-center mt-24 mb-16">
      <div className="max-w-[1300px] flex justify-between">
        <div className="w-fit py-16 flex flex-col justify-center gap-8 mx-10">
          <p className="w-fit text-7xl font-bold">회원가입</p>
          <form className="flex flex-col gap-4 w-fit sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px] border border-black p-4">
            <SignInputCheck
              type="email"
              checkType="emailUnique"
              value={email.value}
              label="이메일 *"
              inputState={email}
              errorMessage="이메일 형식이 올바르지 않습니다."
              setEmailUnique={setEmailUnique}
              setServerAuthNumber={setServerAuthNumber}
            />
            {emailUnique && (
              <SignInputCheck
                type="authNumber"
                checkType="authNumber"
                value={authNumber.value}
                label="인증번호 *"
                inputState={authNumber}
                errorMessage="인증번호 형식이 올바르지 않습니다."
                serverAuthNumber={serverAuthNumber}
                setAuthNumberValid={setAuthNumberValid}
                authNumberValid={authNumberValid}
              />
            )}
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
              errorMessage="2~16자의 한글을 올바르게 입력해 주세요."
            />
            {!isValid && <SignError message="입력값을 다시 확인해주세요." />}
            <div className="flex gap-4 justify-end">
              <button
                onClick={submitHandler}
                className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              >
                회원가입
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

export default Register;
