import { PostsTableCheckbox } from "./PostTableCheckbox";
import { PostsTableData } from "./PostsTableData";

export const PostsRow = ({
  id,
  name,
  title,
  date,
  checkboxClickHandler,
  allChecked,
}) => {
  const rowClickHandler = () => {
    console.log("row clicked");
  };

  return (
    <tr className="py-2 px-4 border-b border-zinc-400 cursor-pointer hover:bg-zinc-100 transition">
      <PostsTableCheckbox
        id={id}
        checkboxClickHandler={checkboxClickHandler}
        allChecked={allChecked}
      />
      <PostsTableData type="id" data={id} onClick={rowClickHandler} />
      <PostsTableData type="name" data={name} onClick={rowClickHandler} />
      <PostsTableData type="title" data={title} onClick={rowClickHandler} />
      <PostsTableData type="date" data={date} onClick={rowClickHandler} />
    </tr>
  );
};
