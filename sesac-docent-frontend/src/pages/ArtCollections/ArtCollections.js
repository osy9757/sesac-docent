import React, { useState, useEffect } from 'react';

export default function Example() {
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState('gallery');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost/posts/listup/${p_table_name}/${p_page_size}/${p_page_number}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [activeTable]);

  const renderContent = (item) => {
    switch (activeTable) {
      case 'gallery':
        return (
          <div>
            <p>{item.galleryName}</p>
            <p>{item.location}</p>
            {/*출력필드 작성*/}
          </div>
        );
      case 'exhibition':
        return (
          <div>
            <p>{item.exhibitionName}</p>
            <p>{item.description}</p>
            {/*출력필드 작성*/}
          </div>
        );
      case 'author':
        return (
          <div>
            <p>{item.authorName}</p>
            <p>{item.biography}</p>
            {/*출력필드 작성*/}
          </div>
        );
      case 'work':
        return (
          <div>
            <p>{item.workTitle}</p>
            <p>{item.year}</p>
            {/*출력필드 작성*/}
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <div>
      <button onClick={() => setActiveTable('gallery')}>Gallery</button>
      <button onClick={() => setActiveTable('exhibition')}>Exhibition</button>
      <button onClick={() => setActiveTable('author')}>Author</button>
      <button onClick={() => setActiveTable('work')}>Work</button>

      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {data.map((item, index) => (
          <li key={index} className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img src={item.imageURL} alt={item.title} className="pointer-events-none object-cover group-hover:opacity-75" />
              <button type="button" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View details for {item.title}</span>
              </button>
            </div>
            <div className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {renderContent(item)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
