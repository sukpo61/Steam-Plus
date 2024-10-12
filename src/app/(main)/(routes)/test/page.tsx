import { Fragment } from 'react';
import { NextPage } from 'next';
import { cn } from '@/lib/utils';

interface MainPageProps {
    searchParams: any;
}

const MainPageLoading = () => {
    const LoadingBlock = () => {
        return <div className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary" />;
    };
    const LoadingList = Array(12).fill(<LoadingBlock />);
    return (
        <>
            {LoadingList.map((item, index) => (
                <Fragment key={index}>{item}</Fragment>
            ))}
        </>
    );
};

const MainPage: NextPage<MainPageProps> = async ({ searchParams }) => {
    const { term } = searchParams;

    return (
        <div className="flex w-full">
            <textarea
                className={cn(
                    'w-full resize-none border-none bg-primary p-0 text-base placeholder:text-primary-foreground/50 focus:outline-none',
                )}
                // ref={combineRef}
                rows={1}
                // onChange={handleOnChange}
            />
        </div>
    );
};

export default MainPage;
