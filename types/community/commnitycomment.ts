export interface PostCommunityDetailCommentParameter {
    comment: string;
}

export interface CommunityDetailCommentResponse extends PostCommunityDetailCommentParameter {
    id: string;
    postId: string;
    username: string;
    timestamp: Date;
    viewcount: number;
}
