export function variableAssignment(string: string, options: any = {}) {
    let result = string;
    const optionsKeyArray = Object.keys(options);
    for (let i = 0; i < optionsKeyArray.length; i += 1) {
        const key = optionsKeyArray[i];
        const value = options[key];
        if (value !== undefined) {
            const regex = new RegExp(`\\{{${key}}}`, 'g');
            result = result.replace(regex, value);
        }
    }
    result = result.replace(/\/{{[\w]+}}/g, '');

    return result;
}
