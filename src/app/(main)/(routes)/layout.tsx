import ChannelSidebar from '@/components/channel/ChannelSidebar';

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full">
            <div className="flex w-[240px]">
                <ChannelSidebar />
            </div>
            <main className='flex h-full flex-1 flex-col items-center overflow-y-scroll bg-[url("https://shared.steamstatic.com/store_item_assets/steam/apps/960990/page_bg_generated_v6b.jpg?t=1667468566")] bg-cover bg-no-repeat'>
                {children}
            </main>
        </div>
    );
};

export default ChannelLayout;
