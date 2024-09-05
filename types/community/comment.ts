export interface CommentRequest {
    content: string;
    images: {
        id: string;
        src: string;
    }[];
}

export interface CommentResponse extends CommentRequest {
    isOwned: boolean;
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentListResponse {
    data: {
        comment: CommentResponse;
        commentCount: number;
        replysCount: number;
    }[];
    nextCursor?: string | null;
}
