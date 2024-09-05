import Sidebar from '@/components/layout/sidebar/SidebarController';

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full">
            <div className="flex w-[240px]">
                <Sidebar />
            </div>
            <main className="flex h-full flex-1 flex-col items-center overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default ChannelLayout;
