import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { XTreeFileComponent } from './tree-file.component';
import { XTreeFileProperty } from './tree-file.property';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XHighlightModule } from '@ng-nest/ui/highlight';

@NgModule({
  declarations: [XTreeFileComponent, XTreeFileProperty],
  exports: [XTreeFileComponent],
  imports: [CommonModule, HttpClientModule, XTreeModule, XHighlightModule]
})
export class XTreeFileModule {}
