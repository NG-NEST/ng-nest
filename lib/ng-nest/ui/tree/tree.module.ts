import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTreeComponent } from "./tree.component";
import { XTreeNodeComponent } from "./tree-node.component";
import { XIconModule } from "@ng-nest/ui/icon";
import { XCheckboxModule } from "@ng-nest/ui/checkbox";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [XTreeComponent, XTreeNodeComponent],
  exports: [XTreeComponent, XTreeNodeComponent],
  imports: [CommonModule, FormsModule, XIconModule, XCheckboxModule]
})
export class XTreeModule {}
