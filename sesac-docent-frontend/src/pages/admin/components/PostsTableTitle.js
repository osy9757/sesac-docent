export const PostsTableTitle = ({ title, buttonName }) => {
  return (
    <div className="w-full flex justify-between items-end">
      <p className="w-1/5 text-start"></p>
      <p className="w-3/5 text-center text-4xl font-semibold">{title}</p>
      <p className="w-1/5 text-end hover:text-zinc-600 hover:underline cursor-pointer">
        {buttonName}
      </p>
    </div>
  );
};
