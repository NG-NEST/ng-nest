import { ShareModule } from '@share';
import { NgModule } from '@angular/core';
import { NsDocsComponent } from './docs.component';
import { NsDocsRoutesModule } from './docs-routes.module';
import { XMenuComponent } from '@ng-nest/ui/menu';

@NgModule({
  imports: [ShareModule, NsDocsRoutesModule, XMenuComponent],
  declarations: [NsDocsComponent],
  exports: [NsDocsComponent]
})
export class NsDocsModule {}
