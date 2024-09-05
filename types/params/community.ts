export interface CommunityParams {
    appId?: string;
}
export interface PostParams {
    postId: string;
}

export interface CommentParams {
    postId: string;
    commentId?: string;
    parentId?: string;
}
export interface PostSearchParams {
    page: string;
}

export interface CommunitySearchParams {
    page?: string | number;
    category?: string;
    term?: string;
    order?: string;
}
