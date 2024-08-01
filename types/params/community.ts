export interface CommunityDetailParams {
    params: {
        id: string;
    };
}

export interface CommunityCommentParams {
    params: {
        postId: string;
        commentId?: string;
        replyId?: string;
    };
}

export interface CommunitySearchParams {
    searchParams: { page: string; category?: string; term?: string };
}

export type CommunityCommentRequestParams = CommunityCommentParams & CommunitySearchParams;
export type CommunityDetailRequestParams = CommunityDetailParams & CommunitySearchParams;
export type CommunityDetailCommentParams = CommunityDetailParams & CommunityCommentParams;
