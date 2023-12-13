import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import { DUMMY_POST } from "./components/DUMMY_POST";
import { Search, Trash2 } from "lucide-react";

import { PostsTableCheckbox } from "./components/PostTableCheckbox";
import { PostsTableData } from "./components/PostsTableData";
import { deletePosts, searchPosts } from "apis/requests";
import { cn } from "utils/tailwind-merge";
import api from "apis/api";

const pageGroupSize = 10;
const pageSize = 10;
const type = "inquiry";
const title = "1:1 문의 관리";

const AdminInquiry = () => {
  const navigate = useNavigate();
  const params = useParams();
  const inqCateParams = params.inqCate;
  const pageNumberParams = params.pageNumber;

  useEffect(() => {
    if (!pageNumberParams || pageNumberParams < 0) {
      navigate(`/admin/inquiry/new/page/1`);
    }
  }, [navigate, pageNumberParams]);

  const [posts, setPosts] = useState([]);
  const [checkedPosts, setCheckedPosts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [lastPage, setLastPage] = useState(120);
  const [pageStart, setPageStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const headboxRef = useRef();

  useEffect(() => {
    if (!pageNumberParams) {
      return;
    }

    headboxRef.current.checked = false;

    if (searchParams.get("search")) {
      console.log(searchParams.get("search"));
      const func = async () => {
        const data = await searchPosts(3, pageSize, 1, searchCriteria);
        setLastPage(data[0].v_last_page);
        setPosts(data);
      };

      func();
      return;
    }

    setCurrentPage(pageNumberParams);

    const fetchPosts = async () => {
      const URI =
        inqCateParams === "all"
          ? `/posts/list/3/${pageSize}/${pageNumberParams}`
          : `/posts/list/3/${pageSize}/${pageNumberParams}?p_post_status=${inqCateParams}`;
      const response = await api.get(URI);

      const updatedPosts = response.data.map((post) => {
        const timestamp = post.v_post_updated_at;
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return {
          ...post,
          v_post_updated_at: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        };
      });

      setLastPage(updatedPosts[0].v_last_page);
      setPosts(updatedPosts);
    };

    fetchPosts();
  }, [inqCateParams, pageNumberParams, searchParams, searchCriteria]);

  useEffect(() => {
    setCheckedPosts([]);
    setAllChecked(false);
    setCurrentPage(pageNumberParams);

    const currentPageStart =
      pageNumberParams % pageGroupSize === 0
        ? pageNumberParams - pageGroupSize + 1
        : pageNumberParams - (pageNumberParams % pageGroupSize) + 1;

    const currentPageEnd = Math.min(
      currentPageStart + pageGroupSize - 1,
      lastPage
    );

    const currentPageGroup = Array.from(
      { length: currentPageEnd - currentPageStart + 1 },
      (_, index) => currentPageStart + index
    );

    setPageStart(currentPageStart);
    setPageGroup(currentPageGroup);
  }, [pageNumberParams, lastPage]);

  const checkboxClickHandler = (id) => {
    setCheckedPosts(
      checkedPosts.includes(id)
        ? checkedPosts.filter((postId) => postId !== id)
        : [...checkedPosts, id]
    );
  };

  const totalClickHandler = (event) => {
    setAllChecked(event.target.checked);
    setCheckedPosts(
      event.target.checked ? posts.map((post) => post.v_post_id) : []
    );
  };

  const handleNextPageGroup = () => {
    const newPage = pageStart + pageGroupSize;
    navigate(`/admin/${type}/${inqCateParams}/page/${newPage}`);
  };

  const handlePrevPageGroup = () => {
    const newPage = pageStart - pageGroupSize;
    navigate(`/admin/${type}/${inqCateParams}/page/${newPage}`);
  };

  const searchValueHandler = (event) => {
    setSearchCriteria(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    navigate(`/admin/${type}/${inqCateParams}/page/1?search=${searchCriteria}`);
  };

  const postClickHandler = (postId) => {
    navigate(`/${type}/post/${postId}`, {
      state: {
        categoryENG: "inquiry",
        categoryKOR: "1:1 문의",
        categoryNUM: "3",
      },
    });
  };

  const deletePostHandler = async (event) => {
    event.preventDefault();
    const response = await deletePosts(checkedPosts);
    if (response === "Post delete successfully") {
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start p-5">
      <div className="w-full h-full px-10 py-5 rounded-xl bg-white flex flex-col justify-start items-center gap-4">
        <div className="w-full flex justify-between items-end px-16">
          <p className="w-1/5 text-start"></p>
          <p className="w-3/5 text-center text-4xl font-semibold">{title}</p>
          <p className="w-1/5 text-start"></p>
        </div>
        <div className="flex gap-12 text-lg text-zinc-400 font-light">
          <Link
            to="/admin/inquiry/new/page/1"
            className={`p-2 ${
              inqCateParams === "new" && "text-black font-medium"
            }`}
          >
            새로운 문의
          </Link>
          <p className="select-none flex items-center">┃</p>
          <Link
            to="/admin/inquiry/done/page/1"
            className={`p-2 ${
              inqCateParams === "done" && "text-black font-medium"
            }`}
          >
            답변 완료된 문의
          </Link>
          <p className="select-none flex items-center">┃</p>
          <Link
            to="/admin/inquiry/all/page/1"
            className={`p-2 ${
              inqCateParams === "all" && "text-black font-medium"
            }`}
          >
            전체 문의
          </Link>
        </div>
        <div className="w-full flex flex-col relative">
          <div
            className={`absolute z-10 w-full h-14 py-2 px-6 flex justify-between bg-zinc-100 items-center rounded-t-md transition-all ${
              checkedPosts.length >= 1
                ? "opacity-100 min-h-14 -translate-y-full"
                : "opacity-0 min-h-0 translate-y-0 overflow-y-hidden"
            }`}
          >
            <p className="text-indigo-500 text-lg font-semibold">
              {checkedPosts.length >= 1 && `${checkedPosts.length}개 선택`}
            </p>
            <button
              className="flex gap-1 font-semibold cursor-pointer"
              onClick={deletePostHandler}
            >
              <Trash2 color="rgb(244 63 94)" />
              <p className="text-rose-500 text-lg">삭제하기</p>
            </button>
          </div>
          <table className="w-full relative z-20">
            <colgroup>
              <col width="5%" />
              <col width="10%" />
              <col width="15%" />
              <col width="45%" />
              <col width="30%" />
            </colgroup>
            <thead>
              <tr className="border-b border-t border-zinc-400 bg-zinc-100">
                <th scope="col">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    onChange={totalClickHandler}
                    ref={headboxRef}
                  />
                </th>
                <th scope="col" className="py-2 px-4 text-start">
                  번호
                </th>
                <th scope="col" className="py-2 px-4 text-start">
                  이름
                </th>
                <th scope="col" className="py-2 px-4 text-start">
                  제목
                </th>
                <th scope="col" className="py-2 px-4 text-start">
                  날짜
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.v_post_id}
                  className="py-2 px-4 border-b border-zinc-400 cursor-pointer hover:bg-zinc-100 transition"
                >
                  <PostsTableCheckbox
                    id={post.v_post_id}
                    checkboxClickHandler={checkboxClickHandler}
                    allChecked={allChecked}
                  />
                  <PostsTableData
                    type="id"
                    data={post.v_post_id}
                    onClick={() => postClickHandler(post.v_post_id)}
                  />
                  <PostsTableData
                    type="name"
                    data={post.v_user_name}
                    onClick={() => postClickHandler(post.v_post_id)}
                  />
                  <PostsTableData
                    type="title"
                    data={post.v_post_title}
                    onClick={() => postClickHandler(post.v_post_id)}
                  />
                  <PostsTableData
                    type="date"
                    data={post.v_post_updated_at}
                    onClick={() => postClickHandler(post.v_post_id)}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between items-center gap-4 mt-4 pr-4">
          <div className="h-12 flex justify-center items-center gap-4 p-4">
            <select id="searchType" className="h-10 border border-black p-2">
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="name">글쓴이</option>
            </select>
            <div className="flex gap-2">
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  className="h-10 border-b border-black p-1 px-4"
                  onChange={searchValueHandler}
                />
                <button type="submit">
                  <Search />
                </button>
              </form>
            </div>
          </div>
          <div className="flex gap-5 text-xl w-fit">
            {pageStart > 10 && (
              <button onClick={handlePrevPageGroup} className="hover:underline">
                이전
              </button>
            )}
            {pageGroup.map((_, index) => {
              const pageNumber = pageStart + index;
              const isCurrentPage = pageNumber === parseInt(currentPage);

              return (
                <Link
                  key={pageNumber + Math.random()}
                  to={`/admin/inquiry/${inqCateParams}/page/${pageNumber}${
                    searchParams.get("search")
                      ? `?search=${searchParams.get("search")}`
                      : ""
                  }`}
                  className={cn(
                    "text-xl hover:underline",
                    isCurrentPage && "font-semibold text-teal-600 underline"
                  )}
                >
                  {pageNumber}
                </Link>
              );
            })}
            {pageStart + pageGroupSize < lastPage && (
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

export default AdminInquiry;
