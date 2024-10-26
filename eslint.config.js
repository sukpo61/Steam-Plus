import perfectionist from 'eslint-plugin-perfectionist';

export default [
    {
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-jsx-props': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    ignoreCase: true,
                    specialCharacters: 'keep',
                    ignorePattern: [],
                    matcher: 'minimatch',
                    groups: [],
                    customGroups: {},
                },
            ],
        },
    },
];
