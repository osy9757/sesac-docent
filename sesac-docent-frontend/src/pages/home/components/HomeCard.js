import { Link } from "react-router-dom";

export const HomeCard = ({ src, title, desc, desc2 }) => {
  return (
    <Link to="#" className="flex flex-col pointer">
      <div className="px-4 mx-auto">
        <div className="border-b border-black ">
          <img src={src} alt={desc} />
        </div>
      </div>
      <p className="mt-8 text-xl font-semibold pl-8">{desc}</p>
      <p className="mt-2 text-3xl font-semibold pl-8">{title}</p>
      <p className="mt-2 text-lg font-medium text-zinc-400 pl-8">{desc2}</p>
    </Link>
  );
};
