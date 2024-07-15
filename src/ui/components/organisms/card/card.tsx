import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ShadowEffect from "../../atoms/shadow-effect";
import CardActions from "@ui/components/molecules/card/card-actions";
import { useAuthStore, useGameInteractionsStore } from "client/store";
import { GameInteraction } from "client/store/types";

interface ICard {
  id: number;
  imageUrl: string;
  name: string;
  height: string;
  dir: string;
  rating: number;
  isLarge: boolean;
}

const Card = React.memo(
  ({ id, imageUrl = "", name = "", height, dir, rating, isLarge }: ICard) => {
    const [hovered, setHovered] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [gameInteraction, setGameInteraction] = useState<
      GameInteraction | undefined
    >(undefined);

    const { gameInteractions } = useGameInteractionsStore();
    const { isAuthenticated } = useAuthStore();

    const fetchGameInteraction = useCallback(() => {
      const interaction = gameInteractions?.find(
        (interaction) => Number(interaction.gameId) === id,
      );
      setGameInteraction(interaction);
      setIsPlayed(interaction?.played || false);
    }, [gameInteractions, id]);

    useEffect(() => {
      fetchGameInteraction();
    }, [fetchGameInteraction]);

    return (
      <>
        <div
          className={`flex flex-${dir} relative cursor-pointer gap-2 rounded-[4px] ring-1 ring-inset ${
            isAuthenticated
              ? isPlayed
                ? "hover:ring-accent-theme"
                : "hover:ring-white/80"
              : "hover:ring-accent-theme"
          } ring-white/10 hover:ring-2 hover:ring-inset lg:ring-[1px]`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <div className="speech down">
              <div className="flex flex-row items-center gap-1">
                <p className="font-normal">{name}</p>
                <p className="font-bold">{rating}</p>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <CardActions
              hovered={hovered}
              liked={gameInteraction?.liked || false}
              setIsPlayed={setIsPlayed}
              played={isPlayed}
              gameId={id.toString()}
              isLarge={isLarge}
            />
          )}

          <div
            className={`relative w-full ${height} flex flex-row justify-center overflow-hidden rounded-[4px] border-2 border-[transparent]`}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${name}-thumb`}
                quality={100}
                width={1000}
                height={1000}
                sizes="100%"
                className="object-cover"
                priority
              />
            ) : (
              <></>
            )}
            <ShadowEffect />
          </div>
        </div>
      </>
    );
  },
);

Card.displayName = "Card";

export default Card;
