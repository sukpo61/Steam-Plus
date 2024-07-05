import styled from '@emotion/styled';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Input from '@components/ui/Input';
import { useUpdateParams } from '@hooks/useUpdateParams';
import SearchIcon from '@components/icons/navigation/Search.icon';

interface SearchInputProps {
    placeholder?: string;
    term?: string;
}

const Form = styled.form`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    max-width: 600px;
`;

const IconContainer = styled.button`
    display: flex;
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

export interface SearchFormValue {
    term: string;
}

const SearchInput: FC<SearchInputProps> = (params) => {
    const { placeholder, term } = params;
    const { updateParams } = useUpdateParams();

    const { register, handleSubmit } = useForm<SearchFormValue>({
        defaultValues: {
            term: term,
        },
    });

    const onValid = useCallback(
        ({ term }: SearchFormValue) => {
            updateParams({ term });
        },
        [updateParams],
    );

    const onSubmit = handleSubmit((data, event) => {
        if (event) {
            event.preventDefault();
        }
        onValid(data);
    });

    return (
        <Form onSubmit={onSubmit}>
            <Input placeholder={placeholder} {...register('term')} />
            <IconContainer type="submit">
                <SearchIcon size={32} />
            </IconContainer>
        </Form>
    );
};

export default SearchInput;
