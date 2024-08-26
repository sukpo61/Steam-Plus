export interface CommentRequest {
    content: string;
    images: {
        id: string;
        src: string;
    }[];
}

export interface CommentResponse extends CommentRequest {
    id: string;
    likes?: string[];
    username: string;
    isOwned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
