import styled from '@emotion/styled';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Input from '@components/ui/Input';
import { useRouter } from 'next/navigation';

interface CenterProps {}

const Form = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export interface SearchFormValue {
    channelName: string;
}

const SearchInput: FC = () => {
    const { replace } = useRouter();

    const { register, handleSubmit } = useForm<SearchFormValue>({
        defaultValues: {
            channelName: ``,
        },
    });

    const onValid = useCallback(({ channelName }: SearchFormValue) => {
        console.log('channelName', channelName);
        replace(`/search/${channelName}`);
    }, []);

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Input placeholder="영어로 입력해주세요" {...register('channelName')} />
        </Form>
    );
};

export default SearchInput;
