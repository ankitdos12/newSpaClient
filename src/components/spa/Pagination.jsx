import React from 'react';

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={`w-10 h-10 rounded-full ${
        currentPage === pageNumber
          ? 'bg-blue-500 text-white font-bold'
          : 'bg-white text-blue-500 hover:bg-blue-50 border'
      }`}
    >
      {pageNumber}
    </button>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(renderPageButton(i));
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <span key={`ellipsis-${i}`} className="px-2">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8 gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-500 hover:bg-blue-50'
        }`}
      >
        ←
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-500 hover:bg-blue-50'
        }`}
      >
        →
      </button>
    </div>
  );
});

export default Pagination;
