'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGameStore } from 'client/store';
import { iocContainer } from '@ioc/index';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import IQueryParams from '@infra/gateways/contracts/query';
import filterGamesByLevenshtein from "utils";

interface IAppProps {
    searchParams: any;
}
async function getGames(currentPage: IQueryParams) {
    const gateway = iocContainer.get<IGamesGateway>('GamesGateway');
    const response = await gateway.searchGame(currentPage)
    return response.games
}
const GameProfile = ({ searchParams }: IAppProps) => {
    const { getGameByName } = useGameStore();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            const gameName = searchParams.name;
            if (!getGameByName(gameName)) {
                try {
                    const apiGame = await getGames({ search: gameName, search_precise: true, page_size: 2, search_exact: true });
                    const filteredGame = filterGamesByLevenshtein(apiGame, gameName)
                    setGame(filteredGame)
                } catch (error) {
                    console.error('Erro ao buscar jogo da API:', error);
                }
            } else {
                setGame(getGameByName(gameName));
            }
        };
        fetchGame();
    }, []);

    return <div className='text-primary-color'>{JSON.stringify(game)}</div>;
};

export default GameProfile;
