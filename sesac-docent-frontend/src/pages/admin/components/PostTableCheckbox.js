import { useEffect, useState } from "react";

export const PostsTableCheckbox = ({
  id,
  checkboxClickHandler,
  allChecked,
}) => {
  const [checked, setChecked] = useState(allChecked);

  useEffect(() => {
    setChecked(allChecked);
  }, [allChecked]);

  const clickHandler = (id) => {
    checkboxClickHandler(id);
    setChecked(!checked);
  };

  return (
    <td className="text-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="w-4 h-4 cursor-pointer"
        onChange={() => clickHandler(id)}
      />
    </td>
  );
};
