import { useState, createRef, useEffect } from "react";
import { useSearchChatGames } from "@ui/queries/games";
import { useClickOutside } from "@ui/hooks/use-click-outside";
interface IName {
  name: string;
}

const GameNameSpan = ({ name }: IName) => {
  const { data, isSuccess } = useSearchChatGames({
    search: name,
    search_exact: true,
    search_precise: true,
    page_size: 3,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [game, setGame] = useState<any>(null);
  const dialogRef = createRef<HTMLDivElement>();

  useClickOutside(dialogRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isSuccess && data) {
      // const filtered = filterGamesByLevenshtein(data.results, name)
      setGame("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <span
        className="color-primary-color cursor-pointer text-left text-sm font-bold underline antialiased"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {name.trim()}
      </span>
      <div className="absolute" ref={dialogRef}>
        {isOpen && (
          <div className="z-60 absolute bottom-24 right-12 z-10 ml-2 mt-10 w-56 rounded-lg border-2 border-purple-500 bg-bkg p-2 text-black shadow-md">
            {/* {!game ? <div>Loading...</div> : <Card id={game.id} dir='col' width="w-full" height="h-24  " imageUrl={game.background_image} name={game.name} percentage={game.metacritic} />
                        } */}
          </div>
        )}
      </div>
    </>
  );
};

export default GameNameSpan;
