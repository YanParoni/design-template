'use client'
import * as React from 'react';
import { ArrowPaginationContainer } from '../atoms/pagination/arrow-pagination-container';
import { BtnNumberPagination } from '../atoms/pagination/button-number-pagination';
import { useSearchParams } from 'next/navigation'
import { usePaginationStore } from 'client/store';
interface PaginationProps {
  hasNextPage?: boolean
  hasPrevPage?: boolean
}


const Pagination = ({ hasNextPage, hasPrevPage }: PaginationProps) => {
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const nextPage = usePaginationStore.getState().currentPage

  const pagesToRender = [];

  const start = +page;
  let end = +page + 3;

  if (nextPage === +page) {
    end = nextPage;
  }

  for (let i = start; i < end; i++) {
    if (i > 0) {
      pagesToRender.push(i);
    }
  }

  return (
    <div className='flex flex-row justify-center pb-12'>
      {pagesToRender &&
        <ArrowPaginationContainer >
          {pagesToRender.map((page) => {
            return <BtnNumberPagination key={`page=${page}`} title={page} />
          })}
        </ArrowPaginationContainer>
      }
    </div>
  );
};

export default Pagination;
