import type { Compiler as RspackCompiler } from '@rspack/core';
import type { Compiler as WebpackCompiler } from 'webpack';
import { createSvgSolidRules, type LoaderOptions, loaderPath } from './core.ts';

export type Compiler = RspackCompiler | WebpackCompiler;

export class RspackPluginSolidSvg {
  name = 'rspack-plugin-solid-svg';
  static loader = loaderPath;

  constructor(private options: LoaderOptions = {}) {}

  apply(compiler: Compiler) {
    const pluginRules = createSvgSolidRules(this.options);

    if (!compiler.options.module) {
      compiler.options.module = {
        rules: [],
        parser: {},
        generator: {},
      };
    }
    if (!compiler.options.module.rules) compiler.options.module.rules = [];

    compiler.options.module.rules.push({
      oneOf: [
        // Rule for SVG files with ?solid query (as JSX components)
        {
          test: /\.svg$/,
          ...pluginRules.solid,
        },
        // Rule for regular SVG files (as URLs)
        {
          test: /\.svg$/,
          ...pluginRules.assetResource,
        },
      ],
    });
  }
}
