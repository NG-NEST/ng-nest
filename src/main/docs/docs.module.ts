import { ShareModule } from 'src/share/share.module';
import { NgModule } from '@angular/core';
import { NsDocsComponent } from './docs.component';
import { NsDocsRoutesModule } from './docs-routes.module';
import { XMenuModule } from '@ng-nest/ui/menu';

@NgModule({
  imports: [ShareModule, NsDocsRoutesModule, XMenuModule],
  declarations: [NsDocsComponent],
  exports: [NsDocsComponent]
})
export class NsDocsModule {}
