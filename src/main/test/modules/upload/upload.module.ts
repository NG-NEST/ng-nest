import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XUploadModule } from '@ng-nest/ui/upload';
import { ExDefaultComponent } from './default/default.component';
import { TeUploadComponent } from './upload.component';
import { ExCustomComponent } from './custom/custom.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExImgComponent } from './img/img.component';
import { XIconComponent } from '@ng-nest/ui/icon';

const routers = [{ path: '', component: TeUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XUploadModule, XLayoutModule, XIconComponent],
  declarations: [TeUploadComponent, ExDefaultComponent, ExCustomComponent, ExImgComponent]
})
export class TeUploadModule {}
