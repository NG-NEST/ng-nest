import { resolve } from 'node:path';
import { NcCore } from '../interfaces/core';
import { hanlderProp } from '.';
import { traverseDirectorySync } from './traverse-ditector';
import { NcProp, NcPropType } from '../interfaces/prop';

export const coreDir = resolve(__dirname, '../../../lib/ng-nest/ui/core');

export async function handlerCore(): Promise<NcCore> {
  const result: NcCore = {
    types: []
  };
  const filePaths: string[] = [];
  traverseDirectorySync(coreDir, (filePath: string) => {
    if (filePath.endsWith('.ts') && !filePath.endsWith('index.ts') && !filePath.endsWith('public-api.ts')) {
      filePaths.push(filePath);
    }
  });

  const props: NcProp[] = [];
  for (let filePath of filePaths) {
    props.push(...(await hanlderProp(filePath, 'en_US')));
  }

  for (let prop of props) {
    if (prop.type === NcPropType.Function) {
      console.log(prop);
    }
  }

  return result;
}
