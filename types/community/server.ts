export interface ServerRequest {
    name: string;
    description: string;
    appId?: number;
}

export interface ServerResponse extends ServerRequest {
    id: string;
    isOwned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
