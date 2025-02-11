'use client';

import {
    MAX_CONTENT_LENGTH,
    MAX_IMAGES_LENGTH,
    MAX_TITLE_LENGTH,
    PostAddFormValue,
} from './PostAddController';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';

import { BgLayout } from '@/components/layout/main/BgLayout';
import { Editor } from '@/components/ui/Editor';
import { Input } from '@/components/ui/Input';
import { PostParams } from 'types/params/community';
import { useFormContext } from 'react-hook-form';

interface PostAddClientProps {
    params: PostParams;
}

export const PostAddClient = ({ params }: PostAddClientProps) => {
    const { postId } = params;
    const { register, setValue } = useFormContext<PostAddFormValue>();

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
        <BgLayout>
            <div className="flex h-full w-full flex-col items-center">
                <div className="flex h-full w-full max-w-[948px]">
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
                            <div className="flex w-96">
                                <Select
                                    defaultValue={'free'}
                                    onValueChange={(value) => setValue('category', value)}
                                >
                                    <SelectTrigger className="border-0 bg-primary-bright outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Select a channel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectData.map(({ id, label }) => (
                                            <SelectItem key={id} value={id} className="capitalize">
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </section>
                        <section className="flex flex-col items-start gap-4 py-4">
                            <span className="text-base">내용</span>
                            <Editor
                                className="min-h-[400px]"
                                placeholder="댓글을 입력하세요."
                                textMaxLength={MAX_CONTENT_LENGTH}
                                textMaxHeight={500}
                                imageMaxlength={MAX_IMAGES_LENGTH}
                                multiple
                            />
                        </section>
                    </div>
                </div>
            </div>
        </BgLayout>
    );
};
