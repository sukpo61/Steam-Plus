import type { Preview } from '@storybook/react';
import '../styles/globals.css';

const getCssVariable = (variableName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
