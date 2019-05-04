import { Components } from "./components";

const componentsFolder = "../../../../../libraries/ng-moon/src/components";

export class Ui {
  private components = new Components();
  init() {
    this.components.init(componentsFolder);
  }
}

const ui = new Ui();
ui.init();
