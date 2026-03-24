import type { Config as SvgoOptions } from 'svgo';
import { compileSvg, optimizeSvg } from './utils.ts';

export type LoaderOptions = {
  svgo?: {
    enabled?: boolean;
    svgoConfig?: SvgoOptions;
  };
};

export default function loader(
  this: {
    async: () => (error: Error | null, result?: string) => void;
    getOptions: () => LoaderOptions;
    resourcePath: string;
  },
  source: string
) {
  const callback = this.async();
  const options: LoaderOptions = this.getOptions();

  const { svgo = { enabled: true } } = options;

  (async () => {
    try {
      let svgCode = source;

      if (svgo.enabled) {
        const optimized = await optimizeSvg(svgCode, this.resourcePath, svgo.svgoConfig);
        svgCode = optimized || svgCode;
      }

      const result = compileSvg(svgCode);
      callback(null, result);
    } catch (error) {
      callback(error as Error);
    }
  })();
}
