// src/components/Pagination.jsx
import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      className="flex items-center justify-center gap-4 text-center mt-20 p-3 text-[1.1rem]"
      previousLabel={'Prev'}
      nextLabel={'Next'}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName="flex items-center justify-center mt-4"
      pageClassName="mx-1"
      previousClassName="mx-1"
      previousLinkClassName="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-200 transition-colors text-[1.1rem]"
      nextClassName="mx-1"
      nextLinkClassName="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-200 transition-colors text-[1.1rem]"
      breakClassName="mx-1"
      breakLinkClassName="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded"
      activeClassName="bg-gray-900 text-white w-[25px] h-[25px] leading-[25px] rounded-lg"
    />
  );
};

export default Pagination;
