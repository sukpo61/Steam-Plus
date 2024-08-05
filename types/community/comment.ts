export interface CommentRequest {
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

export interface CommentResponse extends CommentRequest {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
