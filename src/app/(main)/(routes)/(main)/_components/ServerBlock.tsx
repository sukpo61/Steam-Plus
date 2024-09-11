import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ServerBlockProps {
    data: any;
}

export const ServerBlock = ({ data }: ServerBlockProps) => {
    const { id, name, header_image, short_description, serversCount, membersCount } = data;

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
            <div className="flex flex-1 flex-col gap-2 overflow-hidden p-4">
                <span className="ellipsis">{name}</span>
                <span className="pre-wrap flex-1 text-xs">{short_description}</span>
                <div className="flex w-full gap-4 overflow-hidden">
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        <span className="text-xs">{`${serversCount} 서버`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                        <span className="pre-wrap text-xs">{`${membersCount} 멤버`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
