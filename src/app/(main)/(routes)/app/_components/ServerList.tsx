import { Fragment } from 'react';
import { ServerBlock } from './ServerBlock';

interface ServerListProps {
    data: any;
}

const EmptyState = () => {
    return (
        <div className="flex h-[320px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-primary transition-colors hover:bg-primary-dark">
            <span>개설된 서버가 없습니다.</span>
        </div>
    );
};

const ServerList = ({ data }: ServerListProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <span className="text-lg">서버 리스트</span>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {data[0].data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {data.map((page: any) =>
                            page.data.map((server: any) => (
                                <Fragment key={server.id}>
                                    <ServerBlock data={server} />
                                </Fragment>
                            )),
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ServerList;
