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
        'react-hooks/exhaustive-deps': 'warn',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'react/destructuring-assignment': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'no-console': 'off',
        'no-alert': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    ignorePatterns: ['vite.config.ts'],
};
