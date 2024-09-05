import { ChangeEventHandler } from 'react';

const filelistFormat: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log('event', event);

    const { files } = event.currentTarget;
    if (!files) return;
    let sizeError = false;
    const result = [];
    for (let i = 0; i < files.length; i += 1) {
        // if (i + value.length > maxLength - 1) {
        //     showToast('최대 등록 사진 개수 초과입니다.');
        //     break;
        // }
        const file = files.item(i);
        if (file) {
            if (file.size <= 104857600) {
                result.unshift({
                    id: crypto.randomUUID(),
                    src: file,
                });
            } else {
                sizeError = true;
            }
        }
    }
    // event.currentTarget.value = '';

    console.log('result', result);

    return [...result];

    // if (sizeError) {
    //     showToast('사진이 100MB 제한을 초과했어요.');
    // }
};

export default filelistFormat;
