import dayjs from 'dayjs';

export function timeFormat(timestamp: Date, type?: 'comment') {
    const now = dayjs();
    const time = dayjs(timestamp);

    if (type === 'comment') {
        return `${time.format('YY.MM.DD HH:mm')}`;
    }

    if (now.diff(time, 'hour') < 24) {
        return `${time.format('HH:mm')}`;
    }
    return `${time.format('YY.MM.DD')}`;
}
