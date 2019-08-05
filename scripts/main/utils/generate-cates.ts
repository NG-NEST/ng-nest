import * as fs from "fs-extra";
import { NcCates } from "../interfaces/examples";
import { handlerTabs } from ".";
import { NcTabsLayoutEnum } from "../interfaces/tabs";
import { generateTabs } from "./generate-tabs";

export function generateCates(cates: NcCates) {
  let result = "";
  if (cates.list.length > 0) {
    let catesTabs = handlerTabs({ layout: NcTabsLayoutEnum.Top, folderPath: cates.folderPath });

    generateTabs(catesTabs);

    console.log(catesTabs);
  }
  return result;
}
