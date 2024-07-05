import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface NavButtonProps {
    item: {
        title: string;
        href: string;
        rex: RegExp;
        icon: ({ selected }: { selected: boolean }) => JSX.Element;
        query?: {
            [key: string]: string;
        };
    };
}

const Container = styled.div`
    width: 80px;
    max-width: calc(100% / 5) px;
    height: 80px;
    max-height: calc(100% / 5) px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 8px;
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
    }
`;

const TitleText = styled.span<{ selected: boolean }>`
    font-size: 12px;
    color: ${({ selected }) => (selected ? '#00B8C8' : '#777d87')};
`;

const NavButton = ({ item }: NavButtonProps) => {
    const { title, href, icon, rex } = item;
    const pathname = usePathname();
    const selected = rex.test(pathname);
    const router = useRouter();
    return (
        // <Link href={{ pathname: href }}>
        <Container
            onClick={() => {
                // if (selected) {
                //     return;
                // }
                router.push(href);
            }}
        >
            {icon({ selected })}
            <TitleText selected={selected}>{title}</TitleText>
        </Container>
        // </Link>
    );
};

export default NavButton;
