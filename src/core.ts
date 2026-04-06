import { join } from 'node:path';
import type { Config as SvgoOptions } from 'svgo';

export type LoaderOptions = {
  svgo?: {
    enabled?: boolean;
    svgoConfig?: SvgoOptions;
  };
};

export const loaderPath = join(import.meta.dirname, 'loader.mjs');

export function createSvgSolidRules(options: LoaderOptions = {}) {
  const { svgo = { enabled: true } } = options;

  return {
    solid: {
      resourceQuery: /\?solid/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['solid'] },
        },
        {
          loader: loaderPath,
          options: { svgo },
        },
      ],
      type: 'javascript/auto',
    },
    assetResource: {
      resourceQuery: { not: [/\?solid/] },
      type: 'asset/resource',
      generator: {
        filename: 'assets/[name].[hash][ext]',
      },
    },
  };
}
