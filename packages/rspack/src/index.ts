import { join } from 'node:path';
import type { Compiler as RspackCompiler } from '@rspack/core';
import type { Compiler as WebpackCompiler } from 'webpack';
import type { LoaderOptions } from './loader.ts';

export type Compiler = RspackCompiler | WebpackCompiler;

export class PluginSvgSolid {
  name = 'plugin-svg-solid';
  static loader = join(import.meta.dirname, 'loader.mjs');

  constructor(private loaderOptions: LoaderOptions = {}) {}

  apply(compiler: Compiler) {
    const { svgo = { enabled: true } } = this.loaderOptions;

    compiler.hooks.environment.tap(this.name, () => {
      if (!compiler.options.module) {
        compiler.options.module = {
          rules: [],
          parser: {},
          generator: {},
        };
      }
      if (!compiler.options.module.rules) compiler.options.module.rules = [];

      compiler.options.module.rules.unshift({
        oneOf: [
          // Rule for SVG files with ?solid query (as JSX components)
          {
            test: /\.svg$/,
            resourceQuery: /\?solid/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['solid'],
                },
              },
              {
                loader: PluginSvgSolid.loader,
                options: { svgo },
              },
            ],
            type: 'javascript/auto',
          },
          // Rule for regular SVG files (as URLs)
          {
            test: /\.svg$/,
            resourceQuery: { not: [/\?solid/] },
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name].[hash][ext]',
            },
          },
        ],
      });
    });
  }
}

export default PluginSvgSolid;
