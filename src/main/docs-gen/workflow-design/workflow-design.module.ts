import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsWorkflowDesignComponent } from "./workflow-design.component";
import { NsWorkflowDesignRoutesModule } from "./workflow-design-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, NsWorkflowDesignRoutesModule{{ __custom }}],
  declarations: [NsWorkflowDesignComponent],
  exports: [NsWorkflowDesignComponent]
})
export class NsWorkflowDesignModule {}
