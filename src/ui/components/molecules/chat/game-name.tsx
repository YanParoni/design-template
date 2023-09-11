import { useState, createRef, useEffect } from "react";
import { useSearchGames } from "@ui/queries/games";
import Card from "@ui/components/organisms/card/card";
import { useClickOutside } from '@ui/hooks/use-click-outside';
import { useGameStore } from 'client/store';

interface IName {
    name: string
}

const GameNameSpan = ({ name }: IName) => {
    const { data, isLoading,isSuccess } = useSearchGames(name);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dialogRef = createRef<HTMLDivElement>()
    const { addGame } = useGameStore()
    useClickOutside(dialogRef, () => {
        setIsOpen(false)
    })

   useEffect(() => {
        if (isSuccess && data) {
            addGame(data.games[0]);
        }
    }, [isSuccess, data, addGame]);

    return (
        <>
            <span
                className="cursor-pointer font-bold underline color-primary-color  text-sm antialiased text-left "
                onClick={() => {
                    setIsOpen(!isOpen)
                    addGame(data.games)
                }}
            >
                {name.trim()}
            </span>
            <div className='absolute ' ref={dialogRef}>
                {isOpen && (
                    <div className="absolute w-56 z-60 h-44 bottom-24 right-12 mt-10 ml-2 p-2 bg-bkg border-2 border-purple-500  text-black shadow-md rounded-lg z-10">
                        {isLoading ? <div>Loading...</div> : <Card id={data.games[0].id} dir='col' width="w-full" height="h-24  " imageUrl={data.games[0].background_image} name={data.games[0].name} percentage={data.games[0].metacritic} />
                        }
                    </div>
                )}
            </div>
        </>
    );
};

export default GameNameSpan