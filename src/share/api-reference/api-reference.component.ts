import { Component, computed, effect, inject } from '@angular/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppProp } from '@interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { PrismService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { MdToHtmlPipe } from '../md-to-html.pipe';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XHighlightComponent } from '@ng-nest/ui/highlight';

@Component({
  selector: 'ns-api-reference',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    XButtonComponent,
    XCollapseModule,
    XDialogModule,
    XI18nPipe,
    XHighlightComponent,
    MdToHtmlPipe
  ],
  templateUrl: './api-reference.component.html',
  styleUrl: './api-reference.component.scss'
})
export class NsApiReferenceComponent {
  data = inject<{ property: AppProp }>(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<NsApiReferenceComponent>);
  ps = inject(PrismService);
  domSanitizer = inject(DomSanitizer);
  property = computed(() => this.data.property);

  constructor() {
    effect(() => console.log(this.property()));
  }

  close() {
    this.dialogRef.close();
  }
}
