function variableAssignment(string: string, options: any = {}) {
    let result = string;
    const optionsKeyArray = Object.keys(options);
    for (let i = 0; i < optionsKeyArray.length; i += 1) {
        const regex = new RegExp(`\\{{${optionsKeyArray[i]}}}`, 'g');
        result = result.replace(regex, options[optionsKeyArray[i]]);
    }
    // 일치하는 key가 없을 때 {{key}}를 빈 문자열로 대체
    result = result.replace(/{{\w+}}/g, '');

    return result;
}

export default variableAssignment;
