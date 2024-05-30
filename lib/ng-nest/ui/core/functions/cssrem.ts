import { XIsNumber } from '../interfaces';

/**
 * @zh_CN 转换 css 为 rem 宽度
 * @en_US Convert CSS to pixel width
 */
export function XToCssRem(css: string, fontSize: number) {
  if (css === '0') return 0;
  if (XIsNumber(css)) return Number(css);
  else if (css.endsWith('rem')) return Number(css.replace(/rem/g, ''));
  else if (css.endsWith('px')) return Number(css.replace(/px/g, '')) / fontSize;
  return 0;
}
