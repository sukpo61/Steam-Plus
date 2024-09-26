import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { NavbarServer } from './NavbarServer';

const Navbar = () => {
    return (
        <div
            className="flex h-full w-full flex-col items-center gap-4 overflow-y-scroll bg-primary-darkest pt-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
                <NavbarServer />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default Navbar;
