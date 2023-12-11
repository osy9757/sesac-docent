import api from "apis/api";
import { X } from "lucide-react";

export const SignInputCheck = (props) => {
  const isValid = props.inputState?.hasError ? "invalid" : "normal";
  const colorVariants = {
    normal: "flex items-center gap-1 text-2xl font-semibold text-black",
    invalid: "flex items-center gap-1 text-2xl font-semibold text-rose-700",
  };

  const checkHandler = (event) => {
    event.preventDefault();
    props.setEmailUnique(true);
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
    </div>
  );
};
