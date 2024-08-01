import dayjs from 'dayjs';

function timeFormat(timestamp: number, type?: 'comment') {
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

export default timeFormat;
