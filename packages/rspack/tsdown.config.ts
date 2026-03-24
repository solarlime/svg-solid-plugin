import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/loader.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  deps: {
    neverBundle: ['svgo', '@rspack/core', 'webpack'],
  },
  onSuccess: async () => {
    console.log('✅ Build completed!');
  },
});
