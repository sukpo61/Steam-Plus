export interface RoomTileProps {}

export const RoomTile = ({ data }: any) => {
    const { header_image, steam_appid, name } = data;

    return (
        <div className="flex h-16 w-full cursor-pointer bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20"></div>
    );
};
