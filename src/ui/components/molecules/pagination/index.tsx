import React from 'react';
import { usePaginationStore, useFilterStore } from 'client/store';
import { buildUrl } from '@ui/components/atoms/filters/links';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  next: string | null;
  previous: string | null;
}

const Pagination: React.FC<PaginationProps> = ({ next, previous }) => {
  const { currentPage, setCurrentPage } = usePaginationStore();
  const { genre, platform, store } = useFilterStore();
  const router = useRouter();

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    const filters = { genre, platform, store, pageSize: 40, currentPage: currentPage + 1 };
    const newUrl = buildUrl(filters);
    router.push(newUrl);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    const filters = { genre, platform, store, pageSize: 40, currentPage: currentPage - 1 };
    const newUrl = buildUrl(filters);
    router.push(newUrl);
  };

  return (
    <div className="flex justify-between items-center pt-[10px]">
      {previous ? (
        <button
          className="bg-[#44384f] text-[#ab96b7] font-montserrat text-[12px] w-[78px] h-[29px] rounded shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] hover:bg-[#493d55] hover:text-[#e4ddff]"
          onClick={handlePrevious}
        >
          Previous
        </button>
      ) : (
        <div className="w-[78px] h-[29px]"></div>
      )}
      {next ? (
        <button
          className="bg-[#44384f] text-[#ab96b7] font-montserrat text-[12px] w-[78px] h-[29px] rounded shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] hover:bg-[#493d55] hover:text-[#e4ddff]"
          onClick={handleNext}
        >
          Next
        </button>
      ) : (
        <div className="w-[78px] h-[29px]"></div>
      )}
    </div>
  );
};

export default Pagination;
