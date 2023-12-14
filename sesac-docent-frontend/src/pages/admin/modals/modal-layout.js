export const ModalLayout = ({ children }) => {
  return (
    <div className="absolute z-50 w-full h-full flex justify-center items-center">
      <div className="w-full h-full p-5">{children}</div>
    </div>
  );
};
