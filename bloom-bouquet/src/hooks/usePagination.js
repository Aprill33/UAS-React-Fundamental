/**
 * FILE: src/hooks/usePagination.js
 * TUJUAN: Memusatkan logika pemisahan/paginasi (pembagian data per halaman) agar tidak diulang-ulang di berbagai komponen.
 * CARA PAKAI:
 * import usePagination from '../hooks/usePagination';
 * const { currentData, totalPages, currentPage, setCurrentPage } = usePagination(semuaData, 8);
 */

import { useState } from 'react';

const usePagination = (dataArray, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataArray.length / itemsPerPage) || 1;
  
  // Pastikan currentPage tidak melebihi totalPages (jika data berubah)
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const indexOfLastItem = safeCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentData = dataArray.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentData,
    totalPages,
    currentPage: safeCurrentPage,
    setCurrentPage
  };
};

export default usePagination;
