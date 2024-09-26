export const getChangedProperties = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    const result: Record<string, any> = {};
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            result[key] = obj2[key];
        }
    }
    return result;
};
