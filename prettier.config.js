export default {
  overrides: [
    {
      files: ['*.js', '*.yaml'],
      options: {
        singleQuote: true,
      },
    },
    {
      files: ['*.code-snippets', '*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
};
