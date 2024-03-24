import { NcProp } from './prop';

export interface NcCore {
  types?: NcProp[];
  interfaces?: NcProp[];
  classes?: NcProp[];
  functions?: NcProp[];
  consts?: NcProp[];
  enums?: NcProp[];
}
