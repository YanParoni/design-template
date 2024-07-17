import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchGames } from "@ui/queries/games";
import Card from "@ui/components/organisms/card/card";
import Pagination from "@ui/components/molecules/pagination";
import { usePaginationStore } from "client/store";
import useDeviceDetect from "@ui/hooks/use-device-detect";
import CardLoadingSkeleton from "../card/card-loading-skeleton";

function List() {
  const [layoutLoading, setLayoutLoading] = React.useState(false);
  const { isLoading, data, refetch } = useSearchGames();
  const { pageSize } = usePaginationStore();
  const { isMobile } = useDeviceDetect();

  const isLarge = pageSize === 15;

  useEffect(() => {
    setLayoutLoading(true);
    refetch().finally(() => setLayoutLoading(false));
  }, [pageSize, refetch]);

  if (isLoading || layoutLoading) {
    const skeletons = Array(pageSize).fill(null);

    return (
      <div
        className={`grid w-full gap-2 pt-2 ${isMobile ? "grid-cols-4" : isLarge ? "grid-cols-5" : "grid-cols-8"}`}
      >
        {skeletons.map((_, index) => (
          <CardLoadingSkeleton
            key={index}
            height={
              isMobile ? "h-[101px]" : isLarge ? "h-[255px]" : "h-[150px]"
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-[.76923077rem] flex min-h-screen flex-col pb-4">
      {data?.results && data.results.length > 0 ? (
        <>
          <motion.div
            className={`grid w-full gap-2 ${isMobile ? "grid-cols-4" : isLarge ? "grid-cols-5" : "grid-cols-8"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {data.results.map((game:any) => (
              <Card
                key={game.id}
                id={game.id}
                imageUrl={game.background_image}
                rating={game.rating}
                name={game.name}
                height={
                  isMobile ? "h-[121px]" : isLarge ? "h-[255px]" : "h-[150px]"
                }
                dir="col"
                isLarge={isLarge}
              />
            ))}
          </motion.div>
          <Pagination next={data?.next} previous={data?.previous} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-[24px] text-description">
            No results found.
          </span>
        </div>
      )}
    </div>
  );
}

export default React.memo(List);
