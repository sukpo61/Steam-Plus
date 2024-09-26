'use client';

import { useRouter } from 'next/navigation';
import { NavServerButton } from './NavServerButton';

interface ButtonListProps {
    data: any;
}

export const NavServerButtonList = ({ data }: ButtonListProps) => {
    const { push } = useRouter();

    return (
        <>
            {data.map((server: any) => (
                <NavServerButton key={server.id} data={server} />
            ))}
        </>
    );
};
