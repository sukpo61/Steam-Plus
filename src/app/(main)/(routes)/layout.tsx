import { Sidebar } from '@/components/layout/sidebar/Sidebar';

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full">
            <div className="flex w-0 overflow-hidden bg-primary sm:w-[240px]">
                <Sidebar />
            </div>
            <main className="flex h-full flex-1 flex-col items-center">{children}</main>
        </div>
    );
};

export default ChannelLayout;
