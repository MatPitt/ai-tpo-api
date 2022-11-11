module.exports = {
    env: {
        browser: true,
        // commonjs: true,
        es2021: true,
    },
    extends: ['prettier', 'airbnb-base'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    rules: {
    // "prettier/prettier": "error",
        indent: ['error', 4],
    },
};