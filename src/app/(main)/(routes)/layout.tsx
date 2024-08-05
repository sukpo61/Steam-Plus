import ChannelSidebar from '@components/channel/ChannelSidebar';

// background-image: url('https://shared.steamstatic.com/store_item_assets/steam/apps/960990/page_bg_generated_v6b.jpg?t=1667468566');

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full h-full">
            <div className="flex w-[240px]">
                <ChannelSidebar />
            </div>
            <main className="flex-1 bg-cover bg-no-repeat overflow-y-scroll">{children}</main>
        </div>
    );
};

export default ChannelLayout;
