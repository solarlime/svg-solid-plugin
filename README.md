# SVG Solid Plugin

![CI](https://github.com/solarlime/svg-solid-plugin/workflows/CI/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/node-%3E%3D24-brightgreen)

Build tools for integrating SVG components with SolidJS.

## Overview

This monorepo contains plugins that transform SVG files into SolidJS components for webpack and rspack build tools.

## Packages

- [**@svg-solid-plugin/rspack**](packages/rspack) - Webpack/Rspack plugin for SVG to SolidJS transformation

## Installation

See [packages/rspack/README.md](packages/rspack/README.md) for detailed installation and usage instructions.

## Examples

See the `examples/` directory for complete configurations.

## Development

```bash
# Install dependencies
pnpm install

# Build packages
pnpm build:rspack

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Changelog

See [@svg-solid-plugin/rspack](packages/rspack/CHANGELOG.md) changelog.

## License

MIT License - see [LICENSE](LICENSE) for details.
