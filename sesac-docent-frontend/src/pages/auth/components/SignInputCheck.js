import api from "apis/api";
import { X } from "lucide-react";
import { useState } from "react";
import { validateEmail } from "utils/validate-input";

export const SignInputCheck = (props) => {
  const [unique, setUnique] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isValid = props.inputState?.hasError ? "invalid" : "normal";
  const colorVariants = {
    normal: "flex items-center gap-1 text-2xl font-semibold text-black",
    invalid: "flex items-center gap-1 text-2xl font-semibold text-rose-700",
  };

  const checkHandler = async (event) => {
    event.preventDefault();

    if (props.checkType === "emailUnique") {
      if (!validateEmail(props.value)) {
        return;
      }
      const response = await api.get(`/user/${props.value}`);
      const isUnique = response.data.isUnique;

      if (isUnique) {
        setUnique(true);
        setSubmitted(true);
        props.setEmailUnique(true);
        props.setServerAuthNumber(response.data.authNumber);
        console.log("서버로부터 받은 인증 번호: ", response.data.authNumber);
        console.log("This email is unique.");
      } else {
        setUnique(false);
        setSubmitted(true);
        props.setEmailUnique(false);
        console.log("This email is duplicated.");
      }
    }

    if (props.checkType === "authNumber") {
      setSubmitted(true);
      console.log("입력한 인증번호: ", props.value);
      props.setAuthNumberValid(
        props.value === props.serverAuthNumber ? true : false
      );
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <label className={`${colorVariants[isValid]}`}>
        {isValid === "invalid" && (
          <X strokeWidth={6} size="20" color="rgb(190 18 60)" />
        )}
        {props.label}
      </label>
      <div className="flex gap-2">
        <input
          className="w-4/5 border border-black h-12 text-xl p-2"
          type={props.type}
          onChange={props.inputState?.changeHandler}
          onBlur={props.inputState?.blurHandler}
          placeholder={props?.placeholder}
          readOnly={props?.readOnly}
        />
        <button
          className="w-1/5 border border-black h-12 text-xl p-2 font-semibold hover:bg-black hover:text-white transition"
          onClick={checkHandler}
        >
          확인
        </button>
      </div>
      {isValid === "invalid" && (
        <p className="text-lg font-medium text-rose-700">
          {props.errorMessage}
        </p>
      )}
      {props.checkType === "emailUnique" && unique && submitted && (
        <p className="text-lg font-medium text-teal-500">
          사용할 수 있는 이메일입니다.
        </p>
      )}
      {props.checkType === "emailUnique" && !unique && submitted && (
        <p className="text-lg font-medium text-rose-500">
          이미 가입된 이메일입니다.
        </p>
      )}
      {props.checkType === "authNumber" &&
        props.authNumberValid &&
        submitted && (
          <p className="text-lg font-medium text-teal-500">
            인증이 완료되었습니다.
          </p>
        )}
      {props.checkType === "authNumber" &&
        !props.authNumberValid &&
        submitted && (
          <p className="text-lg font-medium text-rose-500">
            인증 번호가 일치하지 않습니다.
          </p>
        )}
    </div>
  );
};
