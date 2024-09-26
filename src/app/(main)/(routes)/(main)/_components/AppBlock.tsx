import { getFirstSentence } from '@/utils/getChangedProperties';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ServerBlockProps {
    data: any;
}

export const AppBlock = ({ data }: ServerBlockProps) => {
    const {
        id,
        name,
        header_image,
        short_description,
        serversCount,
        membersCount,
        categories,
        genres,
    } = data;

    const { push } = useRouter();

    const onClickHandler = () => {
        push(`/app/${id}`);
    };

    return (
        <div
            className="flex h-[320px] w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-primary transition-colors hover:bg-primary-dark"
            onClick={onClickHandler}
        >
            <div className="relative h-[128px] w-full">
                <Image src={header_image} alt={`${name} thumbnail`} fill objectFit="cover" />
            </div>
            <div className="relative flex flex-1 flex-col gap-2 overflow-hidden p-4">
                <span className="ellipsis">{name}</span>
                <span className="pre-wrap flex-1 text-xs">
                    {getFirstSentence(short_description)}
                </span>
                <div className="relative left-[-2px] flex w-full items-start gap-1">
                    {genres.slice(0, 2).map(({ id, description }: any) => (
                        <span className="rounded-sm bg-primary-bright px-1 py-0.5 text-xs" key={id}>
                            {description}
                        </span>
                    ))}
                </div>
                <div className="flex w-full gap-2 overflow-hidden">
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-600" />
                        <span className="text-xs">{`${serversCount} 서버`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        <span className="pre-wrap text-xs">{`${membersCount} 멤버`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
