import axios from 'axios';
import { ChannelDetailsResponse } from 'types/steam/SteamAppDetailResponse';
import { ChannelSearchResponse } from 'types/steam/SteamSearchResponse';
import {
    OwnedGamesResponse,
    PlayerSummariesResponse,
    RecentlyPlayedGamesResponse,
} from 'types/steam/steamUserResponse';

export const getPlayerSummaries = async (steamid: string) => {
    try {
        const { data } = await axios.get<PlayerSummariesResponse>(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2`,
            {
                params: {
                    key: process.env.STEAM_API_KEY,
                    steamids: steamid,
                },
            },
        );
        const { personaname, profileurl, avatarfull } = data.response.players[0];

        console.log('GetPlayerSummariesResponse', data.response.players[0]);

        const result = {
            name: personaname,
            avatar: avatarfull,
        };

        return result;
    } catch (error) {}
};

export const getRecentlyPlayedGames = async (steamid: string) => {
    try {
        const { data } = await axios.get<RecentlyPlayedGamesResponse>(
            `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001`,
            {
                params: {
                    key: process.env.STEAM_API_KEY,
                    steamid,
                    format: 'json',
                },
            },
        );

        const { games } = data.response;

        return games;
    } catch (error) {
        console.log('GetRecentlyPlayedGames', error);
    }
};

export const getOwnedGames = async (steamid: string) => {
    try {
        const { data } = await axios.get<OwnedGamesResponse>(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001`,
            {
                params: {
                    key: process.env.STEAM_API_KEY,
                    steamid,
                    format: 'json',
                },
            },
        );

        console.log('getOwnedGames', data);
    } catch (error) {
        console.log('GetRecentlyPlayedGames', error);
    }
};

export const getChannelDetails = async (appid: number) => {
    const { data } = await axios.get<ChannelDetailsResponse>(
        'https://store.steampowered.com/api/appdetails',
        {
            params: {
                appids: appid,
            },
        },
    );
    return data[appid].data;
};

export const getChannelSearch = async (term: string) => {
    const { data: channelSummary } = await axios.get<ChannelSearchResponse>(
        'https://store.steampowered.com/api/storesearch',
        {
            params: {
                cc: 'us',
                l: 'en',
                term,
            },
        },
    );
    const appIds = channelSummary.items.map((item) => item.id);
    const appDetailsRequests = appIds.map((id) => getChannelDetails(id));
    const appDetailsResponses = await Promise.all(appDetailsRequests);
    const noneDlcResponses = appDetailsResponses.filter((item) => item.type === 'game');
    return noneDlcResponses;
};
