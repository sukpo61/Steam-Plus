export const getFirstSentence = (paragraph: string) => {
    const sentences = paragraph.split(/[.!?]/);
    return sentences.find((sentence: string) => sentence.trim() !== '') || '';
};
