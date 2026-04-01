import { loadConfig, type Config as OptimizeOptions, optimize } from 'svgo';

export function compileSvg(source: string) {
  const svgWithProps = source
    .replace(/<\?xml[^>]*>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--\s*([\s\S]*?)\s*-->/g, '{/* $1 */}')
    .replace(/(<svg[^>]*)>/i, '$1{...props}>');
  return `export default (props = {}) => ${svgWithProps}`;
}

export async function optimizeSvg(content: string, path: string, svgoConfig?: OptimizeOptions) {
  const config = svgoConfig || (await loadConfig());
  if (config?.datauri) {
    throw new Error(
      'You use the Data URI option for SVGO but this plugin expects XML. Remove this option or use a falsy value.'
    );
  }

  const result = optimize(content, Object.assign({}, config, { path }));
  return result.data;
}
