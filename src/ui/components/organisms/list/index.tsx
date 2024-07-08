import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchGames } from "@ui/queries/games";
import { useGameInteractions } from "@ui/queries/game-interaction";
import Card from "@ui/components/organisms/card/card";
import Spinner from "@ui/components/atoms/spinner";
import Pagination from "@ui/components/molecules/pagination";
import { usePaginationStore } from "client/store";
import useDeviceDetect from "@ui/hooks/use-device-detect";

function List() {
  const [layoutLoading, setLayoutLoading] = React.useState(false);
  const [transformedGames, setTransformedGames] = React.useState<any>([]);
  const { isLoading, data, refetch } = useSearchGames();
  const { pageSize } = usePaginationStore();
  const { isMobile } = useDeviceDetect();
  const { data: interactions, isLoading: interactionsLoading } =
    useGameInteractions();

  function transformGamesWithInteractions(games, interactions) {
    if(!games || !interactions )return 
    return games?.map((game) => {
      const interaction = interactions?.data?.find(
        (interaction) => parseInt(interaction.gameId) === game.id,
      );
      return {
        ...game,
        liked: interaction?.liked || false,
        played: interaction?.played || false,
      };
    });
  }

  useEffect(() => {
    console.log(interactions, data, 'useEffect list transformer')
    if (interactions && data?.results) {
      setTransformedGames(
        transformGamesWithInteractions(data?.results, interactions),
      );
    } else {
      setTransformedGames(data?.results || []);
    }
  }, [interactions, data?.results]);

  useEffect(() => {
    setLayoutLoading(true);
    refetch().finally(() => setLayoutLoading(false));
  }, [pageSize, refetch]);

  if (isLoading || layoutLoading || interactionsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  const isLarge = pageSize === 15;

  return (
    <div className="mt-[.76923077rem] flex min-h-screen flex-col">
      {transformedGames && transformedGames.length > 0 ? (
        <>
          <motion.div
            className={`grid w-full gap-2 ${isMobile ? "grid-cols-4" : isLarge ? "grid-cols-5" : "grid-cols-8"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {transformedGames.map((game) => (
              <Card
                key={game.id}
                id={game.id}
                imageUrl={game.background_image}
                rating={game.rating}
                name={game.name}
                height={
                  isMobile ? "h-[101px]" : isLarge ? "h-[255px]" : "h-[150px]"
                }
                dir="col"
                liked={game.liked}
                played={game.played}
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
