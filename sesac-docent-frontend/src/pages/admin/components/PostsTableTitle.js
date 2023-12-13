// import { Search } from "lucide-react";

export const PostsTableTitle = ({ title, buttonName }) => {
  return (
    <div className="w-full flex justify-between items-end px-16">
      <p className="w-1/5 text-start"></p>
      <p className="w-3/5 text-center text-4xl font-semibold">{title}</p>
      <p className="w-1/5 text-start"></p>
    </div>
  );
};
