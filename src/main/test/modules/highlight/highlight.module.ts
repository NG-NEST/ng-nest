import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExHtmlComponent } from './html/html.component';
import { TeHighlightComponent } from './highlight.component';
import { ExCopyComponent } from './copy/copy.component';

const routers = [{ path: '', component: TeHighlightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XHighlightModule, XLayoutModule],
  declarations: [TeHighlightComponent, ExHtmlComponent, ExCopyComponent]
})
export class TeHighlightModule {}
