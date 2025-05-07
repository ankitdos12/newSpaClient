import React, { useState, useMemo } from 'react';
import SpaCard from './SpaCard';
import Pagination from './Pagination';

const MemoizedSpaCard = React.memo(SpaCard);

const SpaList = ({ spas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const spasPerPage = 6;

  if (!spas || spas.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No spas available at the moment.
      </div>
    );
  }

  // Memoize pagination calculations
  const { currentSpas, totalPages } = useMemo(() => {
    const indexOfLastSpa = currentPage * spasPerPage;
    const indexOfFirstSpa = indexOfLastSpa - spasPerPage;
    return {
      currentSpas: spas.slice(indexOfFirstSpa, indexOfLastSpa),
      totalPages: Math.ceil(spas.length / spasPerPage)
    };
  }, [spas, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSpas.map((spa) => (
          <MemoizedSpaCard key={spa._id} spa={spa} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default React.memo(SpaList);