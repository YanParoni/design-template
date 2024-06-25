import React from 'react';
import { motion } from 'framer-motion';
import { useSearchGames } from '@ui/queries/games';
import Card from '@ui/components/organisms/card/card';
import Spinner from '@ui/components/atoms/loading-spinner';
import Pagination from '@ui/components/molecules/pagination';
import { usePaginationStore } from 'client/store';

function List() {
  const { isLoading, data, refetch } = useSearchGames();
  const { pageSize } = usePaginationStore();

  const [layoutLoading, setLayoutLoading] = React.useState(false);

  React.useEffect(() => {
    setLayoutLoading(true);
    refetch().finally(() => setLayoutLoading(false));
  }, [pageSize, refetch]);

  if (isLoading || layoutLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const isLarge = pageSize === 12;
  return (
    <div className="flex flex-col mt-[.76923077rem]">
      <motion.div
        className={`grid gap-2 w-full ${
          isLarge ? 'grid-cols-4' : 'grid-cols-8'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        {data &&
          data.results.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              imageUrl={game.background_image}
              percentage={game.percentage}
              name={game.name}
              width="w-full"
              height={isLarge ? 'h-[261px]' : 'h-[150px]'}
              dir="col"
            />
          ))}
      </motion.div>
      <Pagination next={data?.next} previous={data?.previous} />
    </div>
  );
}

export default React.memo(List);
