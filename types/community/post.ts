export interface PostRequest {
    title: string;
    category: string;
    content: string;
    likes: string[];
    channelId: string;
    images: {
        id: string;
        src: string;
    }[];
}

export interface PostResponse extends PostRequest {
    id: string;
    viewCount: number;
    isOwned: boolean;
    createdAt: Date;
    updatedAt: Date;
    commentsCount: number;
    likeCount?: number;
    appId: number;
    user: {
        name: string;
        avatar: string;
    };
    appData: PostAppData;
}

export interface CommunityResponse {
    data: PostResponse[];
    appData: PostAppData;
    totalCount: number;
    pageSize: number;
}
export interface PostAppData {
    name: string;
    header_image: string;
    background: string;
}
