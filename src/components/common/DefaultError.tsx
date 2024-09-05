import { RestartIcon } from '@/components/icons/common/Restart.icon';
import { Button } from '@/components/ui/Button';
import { FC, ReactEventHandler } from 'react';

interface DefaultErrorProps {
    onClick: ReactEventHandler<HTMLButtonElement>;
}

const DefaultError: FC<DefaultErrorProps> = ({ onClick }) => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Button onClick={onClick}>
                <RestartIcon />
            </Button>
        </div>
    );
};

export default DefaultError;
