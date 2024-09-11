import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { NavbarServer } from './NavbarServer';

const Navbar = () => {
    return (
        <div className="flex h-full w-full flex-col items-center gap-4 bg-primary-darkest pt-4">
            <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
                <NavbarServer />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default Navbar;
