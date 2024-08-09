import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdateParams } from '@/hooks/useUpdateParams';
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
        <form className="relative flex w-full max-w-[600px] justify-center" onSubmit={onSubmit}>
            <Input placeholder={placeholder} {...register('term')} />
            <Button className="absolute right-0" variant={'trans'} size={'icon'} type="submit">
                <SearchIcon size={32} />
            </Button>
        </form>
    );
};
