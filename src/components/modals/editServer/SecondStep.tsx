'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ModalFormValue } from './EditServerModal';
import { MouseEventHandler } from 'react';
import { TextArea } from '@/components/ui/TextArea';
import { useFormContext } from 'react-hook-form';

interface SecondStepProps {
    step: number;
    onClick?: MouseEventHandler;
}

export const SecondStep = ({ step, onClick }: SecondStepProps) => {
    const {
        register,
        formState: { isSubmitting },
    } = useFormContext<ModalFormValue>();

    return (
        <>
            {step === 2 && (
                <section className="flex w-full flex-col gap-2">
                    <span className="pl-1">서버설명</span>
                    <TextArea
                        {...register('description')}
                        maxHeight={64}
                        className="rounded-md bg-primary-dark p-2"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                        <Button variant="trans" type="button" onClick={onClick}>
                            뒤로
                        </Button>
                        <Button variant="primary">생성</Button>
                    </div>
                </section>
            )}
        </>
    );
};
