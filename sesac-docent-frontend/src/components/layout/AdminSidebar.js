import { useContext } from "react";
import {
  Brush,
  Image,
  Landmark,
  Layout,
  Presentation,
  ScrollText,
  SquareUserRound,
} from "lucide-react";

import BabyGroot from "../../assets/baby-groot.svg";
import { SidebarLink } from "./LayoutLinks";
import { MenuContext } from "./AdminLayout";
import { cn } from "../../utils/tailwind-merge";

export const AdminSidebar = () => {
  const { menuClicked } = useContext(MenuContext);

  return (
    <div
      className={cn(
        "overflow-hidden fixed top-20 z-10 flex flex-col shrink-0 bg-zinc-100 shadow-sm shadow-black",
        menuClicked ? "w-[73px]" : "w-[240px]"
      )}
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="w-full h-20 bg-neutral-300 mb-2 flex justify-center items-center gap-2">
        {!menuClicked && (
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">가디언즈 오브 갤러리</p>
            <p className="text-base font-semibold">김민재 오수영 황수연</p>
          </div>
        )}
        <div className="h-full">
          <img src={BabyGroot} alt="Baby Groot" className="h-full" />
        </div>
      </div>
      <SidebarLink link="/admin" text="대시보드" icon={<Layout />} />
      <SidebarLink
        link="/admin/user"
        text="회원 관리"
        icon={<SquareUserRound />}
      />
      <SidebarLink
        link="/admin/post"
        text="게시물 관리"
        icon={<ScrollText />}
      />
      <SidebarLink link="/admin/gallery" text="공간 관리" icon={<Landmark />} />
      <SidebarLink
        link="/admin/exhibition"
        text="전시 관리"
        icon={<Presentation />}
      />
      <SidebarLink link="/admin/artist" text="작가 관리" icon={<Brush />} />
      <SidebarLink link="/admin/piece" text="작품 관리" icon={<Image />} />
    </div>
  );
};
