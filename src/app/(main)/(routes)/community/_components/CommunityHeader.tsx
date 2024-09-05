'use client';

import { SearchInput } from '@/components/search/SearchInput';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { CommunityParams } from 'types/params/community';
import { CommunityCateButton } from './CommunityCateButton';
import { CommunityOrderSelect } from './CommunityOrderSelect';

interface CommunityHeaderProps {
    params?: CommunityParams;
}

export const CommunityHeader = ({ params }: CommunityHeaderProps) => {
    const appId = params?.appId;
    const { push } = useRouter();

    const onClickHandler = () => {
        if (appId) {
            push(`/community/${appId}/add`);
            return;
        }
        push(`/search?purpose=addpost`);
    };

    return (
        <div className="flex w-full flex-col items-center">
            <CommunityCateButton />
            <div className="mb-4 flex w-full items-center gap-2 bg-primary-foreground/20 p-2">
                <div className="flex w-32">
                    <CommunityOrderSelect />
                </div>
                <div className="flex flex-1">
                    <SearchInput placeholder="검색어를 입력해주세요" />
                </div>
                <Button type="button" onClick={onClickHandler}>
                    글쓰기
                </Button>
            </div>
        </div>
    );
};
