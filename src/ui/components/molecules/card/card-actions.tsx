import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import ControllerIcon from "@ui/components/atoms/card/controller-icon";
import { useCreateInteraction } from "@ui/queries/game-interaction";
import EllipsisIcon from "@ui/components/atoms/card/ellipsis-icon";

type Props = {
  hovered: boolean;
  liked?: boolean;
  played?: boolean;
  gameId: string;
  isLarge: boolean;
  setIsPlayed: any;
};

const CardActions = ({
  hovered,
  liked = false,
  played = false,
  gameId,
  isLarge,
  setIsPlayed,
}: Props) => {
  const { createInteraction } = useCreateInteraction();

  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    setIsLiked(liked);
    setIsPlayed(played);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked, played]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    await createInteraction({ gameId, liked: newLikedState, played: played });
  };

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayed(!played);
    await createInteraction({ gameId, liked: isLiked, played: !played });
  };

  return (
    <>
      {hovered && (
        <div
          className={`absolute bottom-1 left-1/2 z-[100] flex -translate-x-1/2 transform flex-row space-x-2 ${
            isLarge ? "px-4 py-[4px]" : "px-2 py-[2px]"
          } border-1 border- rounded-[3px] bg-black/80`}
        >
          <ControllerIcon
            className={`h-6 w-6 ${isLarge ? "h-7 w-7" : ""} ${
              played
                ? "fill-accent-theme"
                : "fill-light-purple hover:fill-light-purple-hover"
            }`}
            onClick={handlePlay}
          />
          <HeartIcon
            className={`mt-[1px] h-5 w-5 ${isLarge ? "h-6 w-6" : ""} ${
              isLiked ? "fill-alt-accent" : "fill-light-purple hover:fill-light-purple-hover"
            }`}
            onClick={handleLike}
          />
          <EllipsisIcon
            className={`mt-[1px] h-5 w-5 ${isLarge ? "h-6 w-6" : ""} fill-light-purple hover:fill-light-purple-hover`}
          />
        </div>
      )}
    </>
  );
};

export default CardActions;
