import { X } from "lucide-react";

export const SignInput = (props) => {
  const isValid = props.inputState?.hasError ? "invalid" : "normal";
  const colorVariants = {
    normal: "flex items-center gap-1 text-2xl font-semibold text-black",
    invalid: "flex items-center gap-1 text-2xl font-semibold text-rose-700",
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <label className={`${colorVariants[isValid]}`}>
        {isValid === "invalid" && (
          <X strokeWidth={6} size="20" color="rgb(190 18 60)" />
        )}
        {props.label}
      </label>
      <input
        className="border border-black h-12 w-full text-xl p-2"
        type={props.type}
        onChange={props.inputState?.changeHandler}
        onBlur={props.inputState?.blurHandler}
        placeholder={props?.placeholder}
        readOnly={props?.readOnly}
      />
      {isValid === "invalid" && (
        <p className="text-lg font-medium text-rose-700">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
};
