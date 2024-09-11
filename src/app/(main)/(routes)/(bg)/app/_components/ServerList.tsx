import { ServerTile } from './ServerTile';

interface ServerListProps {
    data: any;
}

const ServerList = ({ data }: ServerListProps) => {
    if (data.length === 0) {
        return (
            <div className="flex h-16 w-full items-center justify-center">
                개설된 서버가 없습니다.
            </div>
        );
    }

    return (
        <>
            <div className="flex w-full flex-row-reverse px-4">
                <span className="text-xs">유저수</span>
            </div>
            {data?.map((server: any) => <ServerTile data={server} />)}
        </>
    );
};

export default ServerList;
