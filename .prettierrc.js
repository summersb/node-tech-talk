/** @type {import("prettier").Config} */
module.exports = {
  // Indentation
  tabWidth: 2,
  useTabs: false,

  // Semicolons and quotes
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',

  // Trailing commas
  trailingComma: 'all',

  // Brackets and spacing
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: false,

  // Line length
  printWidth: 120,
  proseWrap: 'never',

  // End of line handling
  endOfLine: 'lf',

  // For TypeScript & JSX
  parser: 'typescript',
}
