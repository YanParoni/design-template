'use client'
import * as React from 'react';
import { ArrowPaginationContainer } from '../atoms/pagination/arrow-pagination-container';
import { BtnNumberPagination } from '../atoms/pagination/button-number-pagination';
import { useSearchParams } from 'next/navigation'
import { useGameStore } from 'client/store';

const Pagination = () => {
  const searchParams = useSearchParams();
  const count = useGameStore().games.count;
  const page = parseInt(searchParams.get('page') || '1', 10); 
  const itemsPerPage = 20; 

  const totalPages = Math.ceil(count / itemsPerPage);

  let startPage = 1;
  let endPage = totalPages;

  if (page > 2) {
    startPage = page - 1;
  }

  if (page < totalPages - 1) {
    endPage = page + 1;
  }

  const pagesToRender = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className='flex flex-row justify-center pb-12'>
      {totalPages > 1 && 
        <ArrowPaginationContainer>
          {pagesToRender.map((pageNumber) => {
            return (
              <BtnNumberPagination
                key={`page=${pageNumber}`}
                title={pageNumber}
                isActive={pageNumber === page} 
              />
            );
          })}
        </ArrowPaginationContainer>
      }
    </div>
  );
};

export default Pagination;