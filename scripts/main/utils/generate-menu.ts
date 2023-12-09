import { NcMenu } from '../interfaces/menu';
import * as fs from 'fs-extra';

/**
 * 生成菜单
 *
 * @export
 * @param {string} genDir
 * @param {NcMenu[]} menus
 */
export function generateMenu(genDir: string, menus: NcMenu[]) {
  fs.writeFileSync(
    `${genDir}/app.menus.ts`,
    `import { Menu } from '@interfaces';
export const menus: Menu[] = ${JSON.stringify(menus, null, 2)}`,
    'utf8'
  );
}
