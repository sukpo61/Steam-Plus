'use client';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/ContextMenu';

import Image from 'next/image';
import { useModalStore } from '@/store/useModalStore';
import { useRouter } from 'next/navigation';

interface NavServerButtonProps {
    data: any;
}

export const NavServerButton = ({ data }: NavServerButtonProps) => {
    const {
        id,
        app: { header_image, id: appId },
        channels,
        name,
        role,
    } = data;

    const { push } = useRouter();
    const { onOpen } = useModalStore();

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div
                        className="relative flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full"
                        onClick={() => push(`/server/${id}?channelId=${channels[0].id}`)}
                    >
                        <Image
                            src={header_image}
                            alt="Postimage"
                            fill
                            objectFit="cover"
                            className="scale-150"
                        />
                    </div>
                </ContextMenuTrigger>
                <ContextMenuPortal>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <span>초대하기</span>
                        </ContextMenuItem>
                        {role === 'GUEST' && (
                            <>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                    onClick={() =>
                                        onOpen('leaveServer', { name, serverId: id, appId })
                                    }
                                >
                                    <span className="text-destructive">서버 나가기</span>
                                </ContextMenuItem>
                            </>
                        )}
                    </ContextMenuContent>
                </ContextMenuPortal>
            </ContextMenu>
        </>
    );
};
