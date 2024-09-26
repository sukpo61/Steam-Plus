import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { seededRandom } from '@/utils/seededRandom';
import { useRouter } from 'next/navigation';

export interface ChannelTileProps {}

const bgVariants = cva('relative h-[128px] w-full', {
    variants: {
        variant: {
            0: 'bg-gradient-to-r from-slate-500 to-slate-800',
            1: 'bg-gradient-to-r from-rose-400 to-red-500',
            2: 'bg-gradient-to-r from-fuchsia-600 to-purple-600',
            3: 'bg-gradient-to-r from-blue-600 to-violet-600',
            4: 'bg-gradient-to-r from-purple-500 to-purple-900',
            5: 'bg-gradient-to-r from-cyan-500 to-blue-500',
            6: 'bg-gradient-to-r from-red-500 to-orange-500',
            7: 'bg-gradient-to-r from-rose-400 to-red-500',
            8: 'bg-gradient-to-r from-blue-200 to-cyan-200',
            9: 'bg-gradient-to-r from-purple-500 to-purple-900',
            10: 'bg-gradient-to-r from-teal-400 to-yellow-200',
        },
    },
    defaultVariants: {
        variant: 0,
    },
});

export const ServerBlock = ({ data }: any) => {
    const { push } = useRouter();
    const { id, name, memberCount, user, description } = data;
    const { avatar } = user;

    const onClickHandler = () => {
        push(`/server/${id}`);
    };

    return (
        <div
            className="flex h-[320px] w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-primary transition-colors hover:bg-primary-dark"
            onClick={onClickHandler}
        >
            <div className="relative flex flex-col">
                <div className={cn(bgVariants({ variant: Math.floor(seededRandom(id) * 10) }))} />
                <div className="absolute -bottom-6 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <UserAvatar className="h-10 w-10" src={avatar} />
                </div>
            </div>
            <div className="relative flex flex-1 flex-col gap-2 overflow-hidden px-4 pb-4 pt-8">
                <span className="ellipsis">{name}</span>
                <span className="pre-wrap flex-1 text-xs">{description}</span>
                <div className="flex w-full gap-4 overflow-hidden">
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-600" />
                        <span className="text-xs">{`0명 온라인`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        <span className="pre-wrap text-xs">{`${memberCount} 멤버`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
