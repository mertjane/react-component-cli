# react-component-cli [![Test](https://github.com/yourusername/react-component-cli/actions/workflows/test.yml/badge.svg)](https://github.com/yourusername/react-component-cli/actions/workflows/test.yml)

A Command line tool that generates React components with TypeScript and SCSS.

## Installation

Install with [npm](https://www.npmjs.com/):

    npm install -g react-component-cli

## Usage

    $ react-component-cli generate <component-name> [options]
    # Short version
    $ react-cli g <component-name> [options]

    Options:
      -p, --path      specify output path (default: "src/components")
      --no-styles     skip SCSS file generation
      --no-types      skip TypeScript interfaces file
      -f, --flat      generate files without component folder
      -l, --list      list available templates

## Supported Templates

This CLI generates the following files for each component:
- `[name].tsx` (React component with TypeScript)
- `[name].styles.scss` (SCSS stylesheet)
- `[name].types.ts` (TypeScript interfaces)

## Examples

### Generate a basic component

    react-cli g Button

### Generate in custom directory

    react-cli g Button --path src/features

### Generate without styles

    react-cli g Button --no-styles

### Generate flat structure

    react-cli g Button --flat
    # Creates:
    # src/components/Button.tsx
    # src/components/Button.styles.scss
    # src/components/Button.types.ts

## Tests

    npm test

## Releases

Publish to npm:

    npm version patch|minor|major
    npm publish

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © mert