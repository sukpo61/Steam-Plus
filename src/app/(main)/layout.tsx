import { Navbar } from '@/components/layout/navigationbar/Navbar';
import { PreviewLayout } from '@/components/layout/main/PreviewLayout';
import { UserProvider } from '@/components/layout/navigationbar/UserProvider';

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <UserProvider />
            <div className="flex h-full w-full">
                <div className="flex w-[72px] flex-shrink-0">
                    <Navbar />
                </div>
                <main className="flex-1">
                    <PreviewLayout>{children}</PreviewLayout>
                </main>
            </div>
        </>
    );
};

export default NavigationLayout;
