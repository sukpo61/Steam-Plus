export interface PlayerSummariesResponse {
    response: {
        players: {
            steamid: string;
            communityvisibilitystate: number;
            profilestate: number;
            personaname: string;
            profileurl: string;
            avatar: string;
            avatarmedium: string;
            avatarfull: string;
            avatarhash: string;
            lastlogoff: number;
        }[];
    };
}

export interface RecentlyPlayedGamesResponse {
    response: {
        total_count: number;
        games: {
            appid: number;
            name: string;
            playtime_2weeks: number;
            playtime_forever: number;
            img_icon_url: string;
            playtime_windows_forever: number;
            playtime_mac_forever: number;
            playtime_linux_forever: number;
            playtime_deck_forever: number;
        }[];
    };
}

export interface OwnedGamesResponse {
    response: {
        total_count: number;
        games: {
            appid: number;
            playtime_forever: number;
            playtime_windows_forever: number;
            playtime_mac_forever: number;
            playtime_linux_forever: number;
            playtime_deck_forever: number;
            rtime_last_played: number;
            playtime_disconnected: number;
        }[];
    };
}

// export interface GetChannelDetailsResponse {
//     response: {
//         total_count: number;
//         games: {
//             appid: number;
//             playtime_forever: number;
//             playtime_windows_forever: number;
//             playtime_mac_forever: number;
//             playtime_linux_forever: number;
//             playtime_deck_forever: number;
//             rtime_last_played: number;
//             playtime_disconnected: number;
//         }[];
//     };
// }
// export interface GetChannelSearchResponse {
//     response: {
//         total_count: number;
//         games: {
//             appid: number;
//             playtime_forever: number;
//             playtime_windows_forever: number;
//             playtime_mac_forever: number;
//             playtime_linux_forever: number;
//             playtime_deck_forever: number;
//             rtime_last_played: number;
//             playtime_disconnected: number;
//         }[];
//     };
// }
