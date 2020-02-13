import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { XCollapseComponent } from "./collapse.component";
import { XCollapsePanelComponent } from "./collapse-panel.component";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XCollapseComponent, XCollapsePanelComponent],
  exports: [XCollapseComponent, XCollapsePanelComponent],
  imports: [CommonModule, BrowserAnimationsModule, XIconModule]
})
export class XCollapseModule {}
