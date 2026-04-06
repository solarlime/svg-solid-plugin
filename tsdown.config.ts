import { defineConfig, type UserConfig } from 'tsdown';

const restOptions: Omit<UserConfig, 'entry'> = {
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  deps: {
    neverBundle: ['svgo', '@rspack/core', 'webpack', '@rsbuild/core'],
  },
};

export default defineConfig([
  { entry: 'src/index.ts', ...restOptions },
  { entry: 'src/rspack.ts', ...restOptions },
  { entry: 'src/rsbuild.ts', ...restOptions },
  { entry: 'src/loader.ts', ...restOptions },
]);
