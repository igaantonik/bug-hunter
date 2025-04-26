module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    rules: {
        // You can adjust the rule's severity or options from here
        'react-hooks/exhaustive-deps': 'warn', // or "error" to enforce this as an error
    },
    settings: {
        react: {
            version: 'detect', // Automatically detects the React version
        },
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
};
