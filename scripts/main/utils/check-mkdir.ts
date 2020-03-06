import * as fs from 'fs-extra';

export function checkMkdir(folderPath: string) {
  const pathArr = folderPath.split('\\');
  let path = '';
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i]) {
      path += path == '' ? `${pathArr[i]}` : `\\${pathArr[i]}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    }
  }
}
