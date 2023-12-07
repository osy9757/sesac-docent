import { useState } from "react";

export const useInput = (validateFunction) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFunction(value);
  const hasError = !isValid && isTouched;

  const changeHandler = (event) => {
    setValue(event.target.value);
  };
  const blurHandler = () => {
    setIsTouched(value.length > 0);
  };
  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset,
  };
};
