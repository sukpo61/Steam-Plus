import { NavbarServer } from './NavbarServer';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';

const Navbar = () => {
    return (
        <div
            className="relative flex h-full w-full flex-col items-center gap-4 overflow-x-visible overflow-y-scroll bg-primary-darkest pt-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
                <NavbarServer />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default Navbar;
