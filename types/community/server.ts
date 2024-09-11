export interface ServerRequest {
    name: string;
    appId: number;
}

export interface ServerResponse extends ServerRequest {
    id: string;
    isOwned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
