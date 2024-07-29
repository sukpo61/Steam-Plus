import { ImageInputValue } from '@components/ui/ImageInput';
export interface CommunityDetailParams {
    id?: string;
}

export interface PostCommunityDetailParameter {
    title: string;
    category: string;
    content: string;
    // image?: ImageInputValue[];
    image?: any[];
}

export interface CommunityDetailResponse extends PostCommunityDetailParameter {
    id: string;
    username: string;
    timestamp: Date;
    viewcount: number;
    subcollectionCount?: number;
}
