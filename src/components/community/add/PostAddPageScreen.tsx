'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TextImageInput } from '@/components/ui/TextImageInput';
import { useFormContext } from 'react-hook-form';
import { PostParams } from 'types/params/community';
import {
    MAX_CONTENT_LENGTH,
    MAX_IMAGES_LENGTH,
    MAX_TITLE_LENGTH,
    PostAddFormValue,
} from './PostAddController';

interface PostAddPageScreenProps {
    params: PostParams;
}

const PostAddPageScreen = ({ params }: PostAddPageScreenProps) => {
    const { postId } = params;
    const {
        register,
        formState: { errors },
    } = useFormContext<PostAddFormValue>();

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
        <div className="flex min-h-full w-full flex-col bg-primary p-8">
            <header className="flex border-b-2 py-4">
                <h1 className="text-3xl">{`게시글 ${postId ? '수정' : '작성'}`}</h1>
            </header>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">제목</span>
                <Input
                    maxLength={MAX_TITLE_LENGTH}
                    placeholder="제목을 입력하세요."
                    {...register('title')}
                />
            </section>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">카테고리</span>
                <Select data={selectData} {...register('category')} />
            </section>
            <section className="flex flex-col items-start gap-4 py-4">
                <span className="text-base">내용</span>
                <TextImageInput
                    className="min-h-[400px]"
                    placeholder="댓글을 입력하세요."
                    textMaxLength={MAX_CONTENT_LENGTH}
                    textMaxHeight={500}
                    imageMaxlength={MAX_IMAGES_LENGTH}
                    multiple
                />
            </section>
        </div>
    );
};

export default PostAddPageScreen;
