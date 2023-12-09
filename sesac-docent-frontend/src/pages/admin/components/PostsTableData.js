import { cn } from "utils/tailwind-merge";

export const PostsTableData = ({ type, data, onClick }) => {
  return (
    <td
      className={cn(
        "py-2 px-4",
        type === "name" && "font-medium text-teal-500"
      )}
      onClick={onClick}
    >
      {data}
    </td>
  );
};
