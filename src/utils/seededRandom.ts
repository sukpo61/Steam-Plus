export const seededRandom = (seed: string | number) => {
    if (typeof seed === 'string') {
        seed = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    let m = 0x80000000;
    let a = 1103515245;
    let c = 12345;

    seed = seed % m;

    seed = (a * seed + c) % m;
    return seed / m;
};
