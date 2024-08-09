import NavigationSidebar from '@/components/navigation/NavigationSidebar';

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full h-full">
            <div className="flex w-[72px]">
                <NavigationSidebar />
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default NavigationLayout;
