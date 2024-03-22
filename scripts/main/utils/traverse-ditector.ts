import { readdirSync } from 'fs-extra';
import { join } from 'node:path';

export function traverseDirectorySync(dirPath: string, fileback: (path: string) => void) {
  const files = readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(dirPath, file.name);

    if (file.isDirectory()) {
      traverseDirectorySync(filePath, fileback);
    } else {
      fileback(filePath);
    }
  }
}
