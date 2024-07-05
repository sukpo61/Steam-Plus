export interface PostCommunityDetailParameter {
    title: string;
    category: string;
    content: string;
}

export interface CommunityDetailResponse extends PostCommunityDetailParameter {
    id: string;
    username: string;
    timestamp: Date;
    viewcount: number;
}
