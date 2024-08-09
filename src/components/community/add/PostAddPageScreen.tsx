'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PostAddFormValue } from './PostAddController';
import { TextImageInput } from '@/components/ui/TextImageInput';
import { PostParams } from 'types/params/community';
import { useFormContext } from 'react-hook-form';

interface PostAddPageScreenProps {
    params: PostParams;
}

const PostAddPageScreen = ({ params }: PostAddPageScreenProps) => {
    const { postId } = params;
    const { register } = useFormContext<PostAddFormValue>();

    const selectData = [
        {
            id: 'free',
            label: '자유',
        },
        {
            id: 'recruit',
            label: '모집',
        },
    ];
    return (
        <div className="flex min-h-full flex-col bg-primary p-8">
            <header className="flex border-b-2 py-4">
                <h1 className="text-3xl">{`게시글 ${postId ? '수정' : '작성'}`}</h1>
            </header>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">제목</span>
                <Input
                    placeholder="제목을 입력하세요."
                    {...register('title', {
                        required: '제목을 입력하세요',
                    })}
                />
            </section>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">카테고리</span>
                <Select data={selectData} {...register('category')} />
            </section>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">내용</span>
                <div className="h-[500px] w-full">
                    <TextImageInput placeholder="댓글을 입력하세요." imageMaxlength={5} multiple />
                </div>
            </section>
        </div>
    );
};

export default PostAddPageScreen;
