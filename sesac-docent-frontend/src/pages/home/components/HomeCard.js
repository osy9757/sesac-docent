import { Link } from "react-router-dom";

function truncateText(text, maxLength) {
  if (!text) return '';

  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export const HomeCard = ({ key, src, title, desc }) => {
  const truncateTitle = truncateText(title,10);
  const truncatedDesc = truncateText(desc, 20); 

  return (
    <Link to="#" className="flex flex-col pointer">
      <div className="px-4 mx-auto">
        <div className="border-b border-black ">
          <img src={src} className="w-64 h-64" />
        </div>
      </div>
      {/* <p className="mt-8 text-xl font-semibold pl-8">{desc}</p> */}
      <p className="mt-2 text-3xl font-semibold pl-8">{truncateTitle}</p>
      <p className="mt-2 text-lg font-medium text-zinc-400 pl-8">{truncatedDesc}</p>
    </Link>
  );
};
