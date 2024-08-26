import { API_GET_CHANNEL_SEARCH_KEY } from '@/actions/search/getChannelSearch';
import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

interface SearchInputProps {
    placeholder?: string;
    term?: string;
}

export interface SearchFormValue {
    term: string;
}

export const SearchInput: FC<SearchInputProps> = (params) => {
    const { placeholder, term } = params;
    const { updateParams } = useUpdateParams();
    const queryCache = useQueryClient();

    const { register, handleSubmit } = useForm<SearchFormValue>({
        defaultValues: {
            term: term,
        },
    });

    const onValid = useCallback(
        async ({ term }: SearchFormValue) => {
            updateParams({ term });
            await queryCache.resetQueries({
                queryKey: [API_GET_CHANNEL_SEARCH_KEY],
            });
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
        <form className="relative flex w-full justify-center" onSubmit={onSubmit}>
            <Input placeholder={placeholder} {...register('term')} />
            <Button className="absolute right-0" variant={'trans'} size={'icon'} type="submit">
                <SearchIcon size={32} />
            </Button>
        </form>
    );
};
