export interface CommunityParams {
    channelId: string;
}
export interface PostParams extends CommunityParams {
    postId: string;
}

export interface CommentParams {
    postId: string;
    commentId?: string;
    replyId?: string;
}
export interface PostSearchParams {
    page: string;
}

export interface CommunitySearchParams {
    page: string;
    pagesize: string;
    category?: string;
    term?: string;
}
