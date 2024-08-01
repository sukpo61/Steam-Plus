export interface PostCommunityDetailParameter {
    title: string;
    category: string;
    content: string;
    images: {
        id: string;
        src: string;
    }[];
    timestamp: number;
    username: string;
}

export interface CommunityDetailResponse extends PostCommunityDetailParameter {
    id: string;
    viewcount: number;
    subcollectionCount?: number;
}
