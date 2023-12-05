<img src="https://github.com/nikkeyl/conqueror/assets/131481562/91695394-437e-43ee-a401-d2f99e8d510c" align="left">

# Conqueror

![EditorConfig](https://github.com/nikkeyl/conqueror/workflows/EditorConfig/badge.svg)
![Markdown](https://github.com/nikkeyl/conqueror/workflows/Markdown/badge.svg)
![ESlint](https://github.com/nikkeyl/conqueror/workflows/ESlint/badge.svg)
![Stylelint](https://github.com/nikkeyl/conqueror/workflows/Stylelint/badge.svg)
![Release](https://img.shields.io/github/v/release/nikkeyl/conqueror)
![CodeSize](https://img.shields.io/github/languages/code-size/nikkeyl/conqueror)

Rapid and modular development.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [NPM Scripts](#npm-scripts)
    -   [Possibilities](#possibilities)
<!--  -->
-   [Architecture](#architecture)
-   [Built With](#built-with)
-   [Contributing](#contributing)
-   [Versioning](#versioning)
-   [Authors](#authors)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## Getting Started

You can use this repository as a template to quickly create your project.

Below you will learn how to get started with **conqueror**
and what features it has.

### Prerequisites

For **conqueror** to work properly, you need the following programs:

-   Node.js
-   Git
-   IDE or Code Editor

### NPM Scripts

After the dependencies are installed,
the following commands are available to you:

-   `build:dev` - Developer mode, this mode runs the `fonts.js`,
    `sprite.js` and `webpack-dev-server` tasks.
<!-- -->
-   `build:prod` - Build mode, in this mode, tasks are run to optimize,
    compress and check the code.
<!-- -->
-   `deploy:gh-pages` - After running the `build` script
    you can run `deploy` and the `dist/` folder will be
    Pushed to your repository in the `gh-pages` branch,
    which will be created automatically.
<!-- -->
-   `stylelint:fix` - Checks and fix `*.scss` files,
    automatically starts with `stylelint.yml`
    on Push and Pull Request.
    Also runs with the `build` script.
<!-- -->
-   `eslint:fix` - Checks and fix `*.js` files,
    automatically starts with `eslint.yml`
    on Push and Pull Request.
    Also runs with the `build` script.
<!-- -->
-   `editorconfig:lint` - Checks all files,
    automatically starts with `editorconfig.yml`
    on Push and Pull Request.
<!-- -->
-   `markdown:lint` - Checks `*.md` files,
    automatically starts with `markdown.yml`
    on Push and Pull Request.
<!-- -->
-   `sprite:update` - Creating an SVG sprite, to do this,
    put your SVG icons in the `img/sprite/` folder,
    this task can be run both separately and in build mode.
<!-- -->
-   `fonts:update` - Converting font files to `.woff2` format,
    to do this, put your fonts in the `fonts/` folder,
    this task can be run both separately with `--update` flag and
    in build/developer mode without `--update` flag.

## Contributing

Please read [Contributing](CONTRIBUTING.md)
and [Code of Conduct](CODE_OF_CONDUCT.md) for details,
and the process for submitting Pull Requests to us.

## Versioning

We use [SemVer](http://semver.org) for versioning.
For the versions available, see the
[tags on this repository](https://github.com/nikkeyl/conqueror/tags).

## Authors

-   **Nikita Almanov** - [nikkeyl](https://github.com/nikkeyl)

See also the list of [Authors](AUTHORS.md)

## Contributors

See the list of [Contributors](CONTRIBUTORS.md)

## License

This project is licensed under the Apache 2.0 License - see the
[LICENSE](LICENSE) file for details.

## Acknowledgments

-   Thanks to everyone who takes part in the development of the project.
