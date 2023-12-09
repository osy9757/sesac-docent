import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";

import { MenuContext } from "pages/layout/AdminLayout";

import { cn } from "utils/tailwind-merge";

export const UpperHeaderLink = ({ link, text }) => {
  return (
    <Link
      to={`${link}`}
      className="flex justify-center items-center gap-1 w-fit font-semibold"
    >
      <IoMdPlay size={12} />
      {text}
    </Link>
  );
};

export const LinkBox = ({ link, text, color }) => {
  return (
    <Link
      to={`${link}`}
      className={cn(
        "flex justify-center items-center w-[168px] h-[55px] border border-black border-solid ",
        "hover:bg-black text-2xl font-bold text-black hover:text-white transition",
        color === "yellow" && "bg-yellow-200",
        color === "white" && "bg-white"
      )}
    >
      {text}
    </Link>
  );
};

export const LowerHeaderLink = ({ link, text }) => {
  return (
    <Link
      to={`${link}`}
      className="hover:underline font-bold xl:text-xl lg:text-lg md:text-base"
    >
      {text}
    </Link>
  );
};

export const FooterLink = ({ link, text }) => {
  return (
    <Link to={`${link}`} className="text-stone-100 text-lg font-semibold">
      {text}
    </Link>
  );
};

export const SidebarLink = ({ link, text, icon }) => {
  const { menuClicked } = useContext(MenuContext);

  return (
    <NavLink
      to={`${link}`}
      className={({ isActive }) =>
        isActive
          ? "h-12 p-4 px-6 text-zinc-500 flex items-center gap-3 text-lg font-medium hover:bg-zinc-200 transition cursor-pointer bg-zinc-200"
          : "h-12 p-4 px-6 text-zinc-500 flex items-center gap-3 text-lg font-medium hover:bg-zinc-200 transition cursor-pointer"
      }
    >
      {icon}
      {!menuClicked && text}
    </NavLink>
  );
};
