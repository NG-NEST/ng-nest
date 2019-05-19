import { NcMenu } from "../interfaces/menu";
import * as fs from "fs-extra";

export function generateMenu(genDir: string, menus: NcMenu[]) {
  fs.writeFileSync(
    `${genDir}/menus.ts`,
    `import { Menu } from "./routes";
export const menus: Menu[] = ${JSON.stringify(menus, null, 2)}`,
    "utf8"
  );
}
