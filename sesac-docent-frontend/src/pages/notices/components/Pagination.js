import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div>
      {[...Array(totalPages)].map((_, index) => (
        <button key={index} onClick={() => setCurrentPage(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;