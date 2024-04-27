import { XIsNumber } from '../interfaces';

/**
 * @zh_CN 转换 csspx 为像素宽度
 * @en_US Convert CSS PX to pixel width
 */
export function XToCssPx(csspx: string, fontSize: number) {
  if (csspx === '0') return 0;
  if (XIsNumber(csspx)) return Number(csspx);
  else if (csspx.endsWith('rem')) return Number(csspx.replace(/rem/g, '')) * fontSize;
  else if (csspx.endsWith('px')) return Number(csspx.replace(/px/g, ''));
  return 0;
}
