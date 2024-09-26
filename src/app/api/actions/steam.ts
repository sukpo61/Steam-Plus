import steamApi from '@/lib/steamApi';
import { ChannelDetailsResponse } from 'types/steam/SteamAppDetailResponse';
import { ChannelSearchResponse } from 'types/steam/SteamSearchResponse';
import {
    OwnedGamesResponse,
    PlayerSummariesResponse,
    RecentlyPlayedGamesResponse,
} from 'types/steam/steamUserResponse';

export const getPlayerSummaries = async (steamid: string) => {
    try {
        const { data } = await steamApi.get<PlayerSummariesResponse>(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2`,
            {
                params: {
                    key: process.env.STEAM_API_KEY,
                    steamids: steamid,
                },
            },
        );
        const { personaname, profileurl, avatarfull } = data.response.players[0];

        const result = {
            name: personaname,
            avatar: avatarfull,
        };

        return result;
    } catch (error) {}
};

export const getRecentlyPlayedGames = async (steamid: string) => {
    try {
        const { data } = await steamApi.get<RecentlyPlayedGamesResponse>(
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

export const getOwnedGames = async (steamid: any) => {
    try {
        const { data } = await steamApi.get<OwnedGamesResponse>(
            `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001`,
            {
                params: {
                    key: process.env.STEAM_API_KEY,
                    steamid,
                    format: 'json',
                },
            },
        );

        return data.response.games;
    } catch (error) {
        console.log('GetRecentlyPlayedGames', error);
    }
};

export const getAppDetails = async (appId: number) => {
    const { data } = await steamApi.get<ChannelDetailsResponse>(
        'https://store.steampowered.com/api/appdetails',
        {
            headers: {
                Cookie: 'Steam_Language=koreana; steamCountry=KR%7Cb42f3af114641abdb663e8a269268c86;',
            },
            params: {
                appids: appId,
            },
        },
    );
    return data[appId].data;
};

export const getChannelSearch = async (term: string) => {
    const { data: channelSummary } = await steamApi.get<ChannelSearchResponse>(
        'https://store.steampowered.com/api/storesearch',
        {
            headers: {
                Cookie: 'Steam_Language=koreana;',
            },
            params: {
                cc: 'us',
                l: 'en',
                term,
            },
        },
    );
    // https://steamcommunity.com/actions/SearchApps
    const appIds = channelSummary.items.map((item) => item.id);
    const appDetailsRequests = appIds.map((id) => getAppDetails(id));
    const appDetailsResponses = await Promise.all(appDetailsRequests);
    const noneDlcResponses = appDetailsResponses.filter((item) => item.type === 'game');
    return noneDlcResponses;
};
