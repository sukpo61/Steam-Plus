'use client';

import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { Typo } from 'styles/Typography';
import { Text } from '@components/ui/Text';
import { timeFormat } from '@utils/timeFormat';
import { PostResponse } from 'types/community/post';
import { COMMUNIY_CATEGORY_LABEL } from './CommunityPageScreen';
import { useState } from 'react';

export interface PostTileProps {
    item: PostResponse;
    onClick: (channelId: string) => void;
}

const PostTile = ({ item, onClick }: PostTileProps) => {
    const { category, title, content, viewcount = 0, images, createdAt, channelId } = item;
    const [isTitle, setIsTitle] = useState(images?.length === 0);

    const handleMouseEnter = () => {
        if (images.length !== 0) setIsTitle(true);
    };

    const handleMouseLeave = () => {
        if (images.length !== 0) setIsTitle(false);
    };

    return (
        <div
            className="relative w-full h-[340px] bg-gray-800 flex flex-col cursor-pointer z-10 hover:outline hover:outline-1 hover:outline-blue-400"
            onClick={() => onClick(channelId)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute top-[-1px] w-full h-[1px] bg-gradient-to-r from-transparent to-transparent via-gray-400 z-[-1]" />
            <div className="relative flex flex-col items-start flex-1 w-full gap-2 p-4">
                {isTitle && (
                    <div
                        className={`absolute flex justify-between p-4 w-full z-[999] ${images?.length !== 0 ? 'bg-gray-700 bg-opacity-50' : ''}`}
                    >
                        <Text text={title} typo={Typo.Title.Header3Regular} />
                        <Text
                            text={`${COMMUNIY_CATEGORY_LABEL.find((item) => item.id === category)?.label}`}
                            typo={Typo.Body.Body2Regular}
                        />
                    </div>
                )}
                {images.length !== 0 ? (
                    <div className="flex w-full h-full p-1.5">
                        <div className="relative flex w-full h-full">
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
                    <div className="flex flex-col items-start w-full gap-2 mt-14 p-4">
                        <Text text={timeFormat(createdAt)} typo={Typo.Body.Body2Regular} />
                        <Text text={content} preLine />
                    </div>
                )}
            </div>
            <div className="flex justify-between w-full min-h-[70px] border-t-2 border-gray-700 p-4">
                <div className="flex flex-row gap-2">
                    <Image
                        alt="profile_image"
                        src={DefaultProfileThumbnail}
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    <Text text={''} typo={Typo.Body.Body2Regular} />
                </div>
                <div className="flex flex-row gap-2">
                    <Text text={`댓글 ${0}`} typo={Typo.Body.Body2Regular} underline />
                    <Text text={`조회수 ${viewcount}`} typo={Typo.Body.Body2Regular} />
                </div>
            </div>
        </div>
    );
};

export default PostTile;
