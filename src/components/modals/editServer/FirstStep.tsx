'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ModalFormValue } from './EditServerModal';
import { MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

interface FirstStepProps {
    step: number;
    onClick: MouseEventHandler;
}

export const FirstStep = ({ step, onClick }: FirstStepProps) => {
    const {
        register,
        formState: { isSubmitting },
    } = useFormContext<ModalFormValue>();

    return (
        <>
            {step === 1 && (
                <section className="flex w-full flex-col gap-2">
                    <span className="pl-1">서버이름</span>
                    <Input {...register('name')} />
                    <div className="mt-2 flex flex-row-reverse">
                        <Button
                            variant="primary"
                            disabled={isSubmitting}
                            type="button"
                            onClick={onClick}
                        >
                            다음
                        </Button>
                    </div>
                </section>
            )}
        </>
    );
};
