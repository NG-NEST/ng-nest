import { ShareModule } from 'src/share/share.module';
import { NgModule } from '@angular/core';
import { NsDocsComponent } from './docs.component';
import { NsDocsRoutesModule } from './docs-routes.module';

@NgModule({
  imports: [ShareModule, NsDocsRoutesModule],
  declarations: [NsDocsComponent],
  exports: [NsDocsComponent]
})
export class NsDocsModule {}
