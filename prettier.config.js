export default {
  overrides: [
    {
      files: ['*.js', '*.yml'],
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
