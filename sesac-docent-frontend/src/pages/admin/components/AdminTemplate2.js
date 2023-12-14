import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { PostsTableTitle } from "./PostsTableTitle";
import { PostsTableRatio } from "./PostsTableRatio";
import { PostsTableHead } from "./PostsTableHead";
import { PostsRow } from "./PostsTableRow";
import { DUMMY_POST } from "./DUMMY_POST";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "store/features/modal-slice";
import { useAppSelector } from "store/store";
import { DUMMY_AUTHOR } from "./DUMMY_AUTHOR";
import { DUMMY_EXHIBITION } from "./DUMMY_EXHIBITION";
import { DUMMY_GALLERY } from "./DUMMY_GALLERY";
import { DUMMY_WORK } from "./DUMMY_WORK";

const x = {
  exhibition: DUMMY_EXHIBITION,
  author: DUMMY_AUTHOR,
  gallery: DUMMY_GALLERY,
  work: DUMMY_WORK,
};

export const AdminTemplate2 = ({ type, title, buttonName }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const DUMMY = x[type];
  console.log(DUMMY);

  useEffect(() => {
    if (!params.pageNumber) {
      navigate(`/admin/${type}/page/1`);
    }
  }, [navigate, params.pageNumber, type]);

  const [posts, setPosts] = useState([]);
  const [checkedPosts, setCheckedPosts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(100);
  const [pageStart, setPageStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerGroup = 15;
  const postsPerPage = 11;

  const checkboxClickHandler = (id) => {
    setCheckedPosts(
      checkedPosts.includes(id)
        ? checkedPosts.filter((postId) => postId !== id)
        : [...checkedPosts, id]
    );
  };

  const totalClickHandler = (event) => {
    setAllChecked(event.target.checked);
    setCheckedPosts(event.target.checked ? posts.map((post) => post.id) : []);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPageGroup = () => {
    const newPage = pageStart + pagesPerGroup;
    setPageStart(newPage);
    navigate(`/admin/${type}/page/${newPage}`);
  };

  const handlePrevPageGroup = () => {
    const newPage = pageStart - pagesPerGroup;
    setPageStart(newPage);
    navigate(`/admin/${type}/page/${newPage}`);
  };

  useEffect(() => {
    setPosts(DUMMY_POST);
    setTotalPages(Math.ceil(1210 / postsPerPage));
  }, []);

  const state = useAppSelector((state) => state.modalReducer);

  const addHandler = async () => {
    dispatch(openModal({ type, data: "" }));
  };

  return (
    <div className="w-full h-full flex justify-center items-start p-5">
      <div className="w-full h-full p-10 rounded-xl bg-white flex flex-col justify-start items-center gap-8">
        <div className="w-full flex justify-between items-center">
          <p className="w-1/5 text-start"></p>
          <p className="w-3/5 text-center text-4xl font-semibold">{title}</p>
          <div className="w-1/5 flex justify-end">
            <button
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              onClick={addHandler}
            >
              추가
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col relative">
          {checkedPosts.length >= 1 && (
            <div className="absolute -top-14 w-full h-14 py-2 px-6 flex justify-between items-center bg-zinc-100 rounded-t-md transition">
              <p>{`${checkedPosts.length}개 선택`}</p>
              <div className="flex gap-1">
                <Trash />
                <p className="text-rose-500">삭제</p>
              </div>
            </div>
          )}
          <table className="w-full">
            <colgroup>
              <PostsTableRatio />
            </colgroup>
            <thead>
              <PostsTableHead
                totalClickHandler={totalClickHandler}
                first="번호"
                second="이름"
                third="설명"
                fourth="설명"
                fifth="설명"
              />
            </thead>
            <tbody>
              {DUMMY.map((post) => (
                <PostsRow
                  key={post.id}
                  id={post.id}
                  status={post.status}
                  name={post.name}
                  title={post.title}
                  date={post.date}
                  checkboxClickHandler={checkboxClickHandler}
                  allChecked={allChecked}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="mx-auto flex gap-5 text-xl">
            {pageStart > 0 && (
              <button onClick={handlePrevPageGroup} className="hover:underline">
                이전
              </button>
            )}
            {[...Array(Math.min(pagesPerGroup, totalPages - pageStart))].map(
              (_, index) => {
                const pageNumber = pageStart + index + 1;
                const isCurrentPage =
                  pageNumber === currentPage ||
                  (currentPage === 1 && index === 0);

                return (
                  <NavLink
                    key={pageNumber}
                    to={`/admin/${type}/page/${pageNumber}`}
                    onClick={() => handlePageClick(pageNumber)}
                    className={
                      isCurrentPage
                        ? "text-xl font-semibold text-teal-600 underline"
                        : "text-xl hover:underline"
                    }
                  >
                    {pageNumber}
                  </NavLink>
                );
              }
            )}
            {pageStart + pagesPerGroup < totalPages && (
              <button onClick={handleNextPageGroup} className="hover:underline">
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
