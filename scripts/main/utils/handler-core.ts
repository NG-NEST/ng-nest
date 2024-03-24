import { resolve } from 'node:path';
import { NcCore } from '../interfaces/core';
import { hanlderProp } from '.';
import { traverseDirectorySync } from './traverse-ditector';
import { NcProp, NcPropType } from '../interfaces/prop';

export const coreDir = resolve(__dirname, '../../../lib/ng-nest/ui/core');

export async function handlerCore(lang: string): Promise<NcCore> {
  const result: NcCore = {
    types: [],
    interfaces: [],
    classes: [],
    functions: [],
    consts: [],
    enums: []
  };
  const filePaths: string[] = [];
  traverseDirectorySync(coreDir, (filePath: string) => {
    if (filePath.endsWith('.ts') && !filePath.endsWith('index.ts') && !filePath.endsWith('public-api.ts')) {
      filePaths.push(filePath);
    }
  });

  const props: NcProp[] = [];
  for (let filePath of filePaths) {
    props.push(...(await hanlderProp(filePath, lang)));
  }

  for (let prop of props) {
    if (prop.type === NcPropType.Type) result.types.push(prop);
    if (prop.type === NcPropType.Interface) result.interfaces.push(prop);
    if (prop.type === NcPropType.Function) result.functions.push(prop);
    if (prop.type === NcPropType.Class) result.classes.push(prop);
    if (prop.type === NcPropType.Const) result.consts.push(prop);
    if (prop.type === NcPropType.Enum) result.enums.push(prop);
  }

  return result;
}
