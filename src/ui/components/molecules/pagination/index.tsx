import React from 'react';
import { usePaginationStore, useFilterStore } from 'client/store';
import { buildUrl } from '@ui/components/atoms/filters/links';
import { useRouter } from 'next/navigation';
import Button from '@ui/components/atoms/button';
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
    const filters = {
      genre,
      platform,
      store,
      pageSize: 40,
      currentPage: currentPage + 1,
    };
    const newUrl = buildUrl(filters);
    router.push(newUrl);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    const filters = {
      genre,
      platform,
      store,
      pageSize: 40,
      currentPage: currentPage - 1,
    };
    const newUrl = buildUrl(filters);
    router.push(newUrl);
  };

  return (
    <div className="flex justify-between items-center mt-[10px] pt-2 border-t border-t-tertiary-bkg">
      {previous ? (
        <Button label="Previous" variant="secondary" onClick={handlePrevious} />
      ) : (
        <div className="w-[57px] h-[29px]"></div>
      )}
      {next ? (
        <Button label="Next" variant="secondary" onClick={handleNext} />
      ) : (
        <div className="w-[57px] h-[29px]"></div>
      )}
    </div>
  );
};

export default Pagination;
