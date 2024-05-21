import { Component, computed, inject } from '@angular/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppPrope } from '@interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { PrismService, TypesService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { MdToHtmlPipe } from '../md-to-html.pipe';

@Component({
  selector: 'ns-api-name',
  standalone: true,
  imports: [NgTemplateOutlet, XButtonComponent, XCollapseModule, XDialogModule, MdToHtmlPipe],
  templateUrl: './api-name.component.html',
  styleUrl: './api-name.component.scss'
})
export class NsApiNameComponent {
  data = inject<{ property: AppPrope; className: string }>(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<NsApiNameComponent>);
  ps = inject(PrismService);
  domSanitizer = inject(DomSanitizer);
  property = computed(() => this.data.property);
  className = computed(() => this.data.className);

  constructor(public types: TypesService) {}

  close() {
    this.dialogRef.close();
  }
}
