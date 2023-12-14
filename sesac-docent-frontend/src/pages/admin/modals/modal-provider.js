import { useEffect, useState } from "react";
import { AuthorModal } from "./author-modal";
import { ExhibitionModal } from "./exhibition-modal";
import { GalleryModal } from "./gallery-modal";
import { WorkModal } from "./work-modal";
import { useAppSelector } from "store/store";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const state = useAppSelector((state) => state.modalReducer);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {state.isOpen && state.type === "author" && <AuthorModal />}
      {state.isOpen && state.type === "exhibition" && <ExhibitionModal />}
      {state.isOpen && state.type === "gallery" && <GalleryModal />}
      {state.isOpen && state.type === "work" && <WorkModal />}
    </>
  );
};
