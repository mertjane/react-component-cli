[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# React Component Generator

A Command line tool that generates React components with TypeScript and SCSS.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation

Install with [npm](https://www.npmjs.com/):

    npm i @mertjane/reactgen-component

for Globally installation:

    npm install -g @mertjane/reactgen-component

## Usage
    
    # for creating component:

    $ react generate-component <component-name> [options]
    # Short version
    $ react g-c <component-name> [options]

    #for creating react context file:
    
    $ react generate-context <component-name> [options]
    # Short version
    $ react g-ctx <component-name> [options]

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
or
- `[name].jsx` (React component with TypeScript)
- `[name].styles.css` (SCSS stylesheet)

## Examples

### Generate a basic component

    react g-c Button

### Generate in custom directory

    react g-c Button --path src/features

### Generate without styles

    react g-c Button --no-styles

### Generate flat structure

    react g-c Button --flat
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