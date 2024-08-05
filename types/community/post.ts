export interface PostRequest {
    title: string;
    category: string;
    content: string;
    likes: string[];
    channelId: string;
    images: {
        id: string;
        src: string;
    }[];
}

export interface PostResponse extends PostRequest {
    id: string;
    viewcount: number;
    createdAt: Date;
    updatedAt: Date;
}
