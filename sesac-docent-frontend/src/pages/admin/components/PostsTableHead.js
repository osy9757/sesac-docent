export const PostsTableHead = ({
  totalClickHandler,
  first,
  second,
  third,
  fourth,
  fifth,
}) => {
  return (
    <tr className="border-b border-t border-zinc-400 bg-zinc-200/75">
      <th scope="col">
        <input
          type="checkbox"
          className="w-4 h-4 cursor-pointer"
          onChange={totalClickHandler}
        />
      </th>
      <th scope="col" className="py-2 px-4 text-start">
        {first}
      </th>
      <th scope="col" className="py-2 px-4 text-start">
        {second}
      </th>
      <th scope="col" className="py-2 px-4 text-start">
        {third}
      </th>
      <th scope="col" className="py-2 px-4 text-start">
        {fourth}
      </th>
      <th scope="col" className="py-2 px-4 text-start">
        {fifth}
      </th>
    </tr>
  );
};
