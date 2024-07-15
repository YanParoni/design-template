import React from "react";
import { usePaginationStore, useFilterStore } from "client/store";
import { buildUrl } from "@ui/components/atoms/filters/links";
import { useRouter } from "next/navigation";
import Button from "@ui/components/atoms/buttons/button";
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
    <div className="mt-[10px] flex items-center justify-between border-t border-t-tertiary-bkg pt-2">
      {previous ? (
        <div className="h-7 w-16">
          <Button
            label="Previous"
            variant="secondary"
            onClick={handlePrevious}
          />
        </div>
      ) : (
        <div className="h-[29px] w-[57px]"></div>
      )}
      {next ? (
        <div className="h-7 w-14">
          <Button label="Next" variant="secondary" onClick={handleNext} />
        </div>
      ) : (
        <div className="h-[29px] w-[57px]"></div>
      )}
    </div>
  );
};

export default Pagination;
