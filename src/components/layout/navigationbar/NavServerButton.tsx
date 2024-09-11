'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NavServerButtonProps {
    data: any;
}

export const NavServerButton = ({ data }: NavServerButtonProps) => {
    const {
        id,
        app: { header_image },
    } = data;

    const { push } = useRouter();

    return (
        <div
            className="relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full"
            onClick={() => push(`/server/${id}`)}
        >
            <Image
                src={header_image}
                alt="Postimage"
                fill
                objectFit="cover"
                className="scale-150"
            />
        </div>
    );
};
