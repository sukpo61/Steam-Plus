export interface PostCommunityDetailCommentParameter {
    content: string;
    images: {
        id: string;
        src: string;
    }[];
    likes: string[];
    timestamp: number;
    username: string;
    like?: string;
}

export interface CommunityDetailCommentResponse extends PostCommunityDetailCommentParameter {
    id: string;
    viewcount: number;
    subcollectionCount: number;
}
