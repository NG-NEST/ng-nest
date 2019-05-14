import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsWorkflowDesignComponent } from "./workflow-design.component";
import { NsWorkflowDesignRoutesModule } from "./workflow-design-routes.module";

@NgModule({
  imports: [CommonModule, NsWorkflowDesignRoutesModule],
  declarations: [NsWorkflowDesignComponent],
  exports: [NsWorkflowDesignComponent]
})
export class NsWorkflowDesignModule {}
