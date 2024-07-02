import React, { useState, useEffect } from 'react';
import { EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/solid';
import ControllerIcon from '@ui/components/atoms/card/controller-icon';
import { useCreateInteraction } from '@ui/queries/game-interaction';
import EllipsisIcon from '@ui/components/atoms/card/ellipsis-icon';
type Props = {
  hovered: boolean;
  liked?: boolean;
  played?: boolean;
  gameId: string;
  isLarge: boolean;
};

const CardActions = ({ hovered, liked = false, played = false, gameId, isLarge }: Props) => {
  const { createInteraction } = useCreateInteraction();

  const [isLiked, setIsLiked] = useState(liked);
  const [isPlayed, setIsPlayed] = useState(played);

  useEffect(() => {
    setIsLiked(liked);
    setIsPlayed(played);
  }, [liked, played]);

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    await createInteraction({ gameId, liked: newLikedState, played: isPlayed });
  };

  const handlePlay = async () => {
    const newPlayedState = !isPlayed;
    setIsPlayed(newPlayedState);
    await createInteraction({ gameId, liked: isLiked, played: newPlayedState });
  };

  return (
    <>
      {hovered && (
        <div
          className={`absolute bottom-1 z-[100] left-1/2 transform -translate-x-1/2 flex flex-row space-x-2 ${
            isLarge ? 'px-4 py-[4px]' : 'px-2 py-[2px]'
          } rounded-[3px] bg-black/80 border-1 border-`}
        >
          <ControllerIcon
            className={`w-6 h-6 ${isLarge ? 'w-7 h-7' : ''} ${
              isPlayed ? 'fill-accent-theme' : 'fill-[#f1ddff] hover:fill-[#d8c7e2]'
            }`}
            onClick={handlePlay}
          />
          <HeartIcon
            className={`mt-[1px] w-5 h-5 ${isLarge ? 'w-6 h-6' : ''} ${
              isLiked ? 'fill-[#FF9010]' : 'fill-[#f1ddff] hover:fill-[#d8c7e2]'
            }`}
            onClick={handleLike}
          />
          <EllipsisIcon
            className={`mt-[1px] w-5 h-5 ${isLarge ? 'w-6 h-6' : ''} fill-[#f1ddff] hover:fill-[#d8c7e2]`}
          />
        </div>
      )}
    </>
  );
};

export default CardActions;
