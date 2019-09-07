import { NcPage } from "./../../../interfaces/page";
import { NcComponents } from "./components";
import { isString } from "util";
import { docsPrefix } from "..";

const componentsFolder = "../../../../../libraries/ng-moon/src/components";

const uiPrefix = `${docsPrefix}-ui`;

export class NcUiPage extends NcPage {
  constructor(param: NcUiPage | string) {
    if (isString(param)) param = { name: param, prefix: uiPrefix };
    super(param);
  }
}

export class NcUi {
  components = new NcComponents();
  page: NcPage;
  children: NcPage[] = [];
  init() {
    this.genComponent();
    this.components.init(componentsFolder);
  }
  genComponent() {
    // global["NcDocs"] as NcDocs
    // this.page = createRouterOutlet(docsPrefix);

    // handlerPage(this.page, path.join(genDir, this.page.name));
    // this.addChildren();
    // generatePage(this.page);
    // console.log(this.page)
  }
}
