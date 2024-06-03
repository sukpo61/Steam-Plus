interface GamePrice {
    currency: string;
    initial: number;
    final: number;
}

interface GamePlatforms {
    windows: boolean;
    mac: boolean;
    linux: boolean;
}

export interface GameItem {
    type: string;
    name: string;
    id: number;
    price: GamePrice;
    tiny_image: string;
    metascore: string;
    platforms: GamePlatforms;
    streamingvideo: boolean;
    controller_support?: string;
}

export interface SteamSearchResponse {
    total: number;
    items: GameItem[];
}
