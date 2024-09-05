import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface SearchInputProps {
    placeholder?: string;
    term?: string;
}

export interface SearchFormValue {
    term: string;
}

export const SearchInput: FC<SearchInputProps> = (props: SearchInputProps) => {
    const { placeholder } = props;

    const { register } = useFormContext<SearchFormValue>();

    return (
        <div className="relative flex w-full justify-center">
            <Input placeholder={placeholder} {...register('term')} />
            <Button className="absolute right-0" variant={'trans'} size={'icon'} type="submit">
                <SearchIcon size={32} />
            </Button>
        </div>
    );
};
