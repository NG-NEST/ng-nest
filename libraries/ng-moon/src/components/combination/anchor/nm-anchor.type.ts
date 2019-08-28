import { NmIdentityOption } from "../../../interfaces/identify.type";

export const AnchorPrefix = "nm-anchor";

/** Anchor 参数对象 */
export interface NmAnchorOption {
  nmLayout?: NmAnchorLayoutEnum;
}

export enum NmAnchorLayoutEnum {
  Left = "left",
  Right = "right"
}

/** Anchor 数据对象 */
export interface NmAnchorNode extends NmIdentityOption {
  nmLeft?: number;
  nmIcon?: string;
  nmLink?: string;
}

// ActivatedAnchor 激活的anchor
export interface NmActivatedAnchor {
  nmActivatedIndex?: number;
  nmActivatedAnchor?: NmAnchorNode;
}
