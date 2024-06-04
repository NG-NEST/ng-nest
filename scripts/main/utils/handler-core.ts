import { resolve } from 'node:path';
import { NcCore } from '../interfaces/core';
import { hanlderProp } from '.';
import { traverseDirectorySync } from './traverse-ditector';

export const coreDir = resolve(__dirname, '../../../lib/ng-nest/ui/core');

export async function handlerCore(lang: string): Promise<NcCore> {
  const result: NcCore = [];

  const filePaths: string[] = [];
  traverseDirectorySync(coreDir, (filePath: string) => {
    if (filePath.endsWith('.ts') && !filePath.endsWith('index.ts') && !filePath.endsWith('public-api.ts')) {
      filePaths.push(filePath);
    }
  });
  for (let filePath of filePaths) {
    result.push(...(await hanlderProp(filePath, lang)));
  }

  return result;
}
