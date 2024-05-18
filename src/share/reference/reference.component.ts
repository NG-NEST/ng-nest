import { Component, computed, inject } from '@angular/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppProp } from '@interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { PrismService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { MdToHtmlPipe } from '../md-to-html.pipe';

@Component({
  selector: 'ns-reference',
  standalone: true,
  imports: [NgTemplateOutlet, XButtonComponent, XCollapseModule, XDialogModule, MdToHtmlPipe],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class NsReferenceComponent {
  data = inject<{ property: AppProp }>(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<NsReferenceComponent>);
  ps = inject(PrismService);
  domSanitizer = inject(DomSanitizer);
  property = computed(() => this.data.property);

  constructor() {
    console.log(this.property());
  }

  close() {
    this.dialogRef.close();
  }
}
