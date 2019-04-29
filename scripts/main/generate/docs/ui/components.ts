import * as Fs from "fs-extra";
import * as Path from "path";

export class Components {
  componentsPath = Path.resolve(
    __dirname,
    "../../../../libraries/ng-moon/src/components"
  );
  constructor() {}
  init() {
    const componentsFolder = Fs.readdirSync(this.componentsPath);
  }
}
