import { Separator } from '@/components/ui/Separator';
import { timeFormat } from '@/utils/timeFormat';
import Image from 'next/image';
import DefaultImage from 'public/images/profile/profile.png';
import { useState } from 'react';
import { PostResponse } from 'types/community/post';
import { COMMUNIY_CATEGORY_LABEL } from './CommunityCateButton';

export interface PostTileProps {
    item: PostResponse;
    onClick: () => void;
}

export const PostTile = ({ item, onClick }: PostTileProps) => {
    const { category, title, content, viewCount = 0, images, createdAt, commentsCount } = item;
    const [isTitle, setIsTitle] = useState(images?.length === 0);
    const isImage = images.length !== 0;

    const handleMouseEnter = () => {
        if (isImage) setIsTitle(true);
    };

    const handleMouseLeave = () => {
        if (isImage) setIsTitle(false);
    };

    return (
        <div
            className="relative z-10 flex h-[340px] w-full cursor-pointer flex-col bg-primary hover:outline hover:outline-1 hover:outline-secondary"
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute top-[-1px] z-[-1] h-[1px] w-full bg-gradient-to-r from-secondary to-primary" />
            <div className="relative flex w-full flex-1 flex-col items-start gap-2">
                {isTitle && (
                    <div
                        className={`absolute left-0 top-0 z-[99] flex w-full items-center justify-between p-4 ${isImage && 'bg-primary/80'}`}
                    >
                        <span className="ellipsis text-3xl">{title}</span>
                        <span className="text-sm">
                            {COMMUNIY_CATEGORY_LABEL.find((item) => item.id === category)?.label}
                        </span>
                    </div>
                )}
                {isImage ? (
                    <div className="flex h-full w-full p-1.5">
                        <div className="relative flex h-full w-full">
                            <Image
                                key={images[0].id}
                                src={images[0].src}
                                alt="Postimage"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 mt-11 flex h-auto w-full flex-1 basis-0 flex-col items-start gap-2 overflow-hidden p-4">
                        <span className="text-sm">{timeFormat(createdAt)} </span>
                        <span className="pre-wrap flex flex-1 text-base">{content}</span>
                        <div className="absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-t from-primary to-transparent" />
                    </div>
                )}
            </div>
            <Separator />
            <div className="flex min-h-[70px] w-full items-center justify-between border-t-2 border-primary-bright p-4">
                <div className="flex items-center gap-2">
                    <Image
                        alt="profile_image"
                        src={DefaultImage}
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    <span className="text-sm">{timeFormat(createdAt)} </span>
                </div>
                <div className="flex gap-2">
                    <span className="text-sm">{`댓글 ${commentsCount}`} </span>
                    <span className="text-sm">{`조회수 ${viewCount}`} </span>
                </div>
            </div>
        </div>
    );
};
