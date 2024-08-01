import styled from '@emotion/styled';
import { ReactJsPaginationProps } from 'react-js-pagination';
import Pagination from 'react-js-pagination';

const Container = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
    }
    ul.pagination li:first-child {
        border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
        border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
        text-decoration: none;
        color: #fff;
        font-size: 1rem;
    }
    ul.pagination li.active a {
        color: white;
    }
    ul.pagination li.active {
        border-radius: 4px;
        background: var(--Grey);
    }
    li.disabled a {
        display: none;
    }
`;

const StyledPagination = (props: ReactJsPaginationProps) => {
    const { itemsCountPerPage, totalItemsCount } = props;
    if (itemsCountPerPage)
        return (
            <Container>
                {totalItemsCount > itemsCountPerPage && <Pagination {...props} />}
            </Container>
        );
};

export default StyledPagination;
