import ChannelSidebar from '@/components/layout/navigationbar/ChannelSidebar';

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full">
            <div className="flex w-[72px]">
                <ChannelSidebar />
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default NavigationLayout;
