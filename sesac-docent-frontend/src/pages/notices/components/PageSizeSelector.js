import React from 'react';

const PageSizeSelector = ({ pageSize, setPageSize }) => {
  const options = [5, 10, 15, 20];

  return (
    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
      {options.map(size => (
        <option key={size} value={size}>
          {size} per page
        </option>
      ))}
    </select>
  );
};

export default PageSizeSelector;