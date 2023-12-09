import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { PostsTableTitle } from "./PostsTableTitle";
import { PostsTableRatio } from "./PostsTableRatio";
import { PostsTableHead } from "./PostsTableHead";
import { PostsRow } from "./PostsTableRow";
import { DUMMY_POST } from "./DUMMY_POST";

export const AdminTemplate = ({ type, title, buttonName }) => {
  const navigate = useNavigate();
  const params = useParams();

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

  return (
    <div className="w-full h-full flex justify-center items-start p-5">
      <div className="w-full h-full p-10 rounded-xl bg-white flex flex-col justify-start items-center gap-8">
        <PostsTableTitle title={title} buttonName={buttonName} />
        <table className="w-full">
          <colgroup>
            <PostsTableRatio />
          </colgroup>
          <thead>
            <PostsTableHead
              totalClickHandler={totalClickHandler}
              first="번호"
              second="상태"
              third="이름"
              fourth="제목"
              fifth="날짜"
            />
          </thead>
          <tbody style={{ height: postsPerPage * 41 + "px" }}>
            {posts.map((post) => (
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
