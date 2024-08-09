'use client';

import ReactJsPagePagination, { ReactJsPaginationProps } from 'react-js-pagination';

export const Pagination = (props: ReactJsPaginationProps) => {
    const { itemsCountPerPage, totalItemsCount } = props;
    if (itemsCountPerPage)
        return (
            <div className="flex">
                {totalItemsCount > itemsCountPerPage && (
                    <ReactJsPagePagination
                        {...props}
                        pageRangeDisplayed={10}
                        innerClass="flex list-none p-0"
                        itemClass="inline-block w-8 h-8 flex justify-center items-center text-base"
                        linkClass="no-underline text-white text-base"
                        activeLinkClass="text-white"
                        activeClass="rounded bg-primary-foreground/50"
                        disabledClass="opacity-0 cursor-default"
                    />
                )}
            </div>
        );
};
