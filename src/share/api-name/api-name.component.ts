import { Component, computed, inject } from '@angular/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppPrope, en_US, zh_CN } from '@interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { ConfigService, PrismService, TypesService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { MdToHtmlPipe } from '../md-to-html.pipe';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XPopoverDirective } from '@ng-nest/ui/popover';

@Component({
  selector: 'ns-api-name',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    XButtonComponent,
    XCollapseModule,
    XDialogModule,
    XPopoverDirective,
    XI18nPipe,
    MdToHtmlPipe
  ],
  templateUrl: './api-name.component.html',
  styleUrl: './api-name.component.scss'
})
export class NsApiNameComponent {
  data = inject<{ property: AppPrope; className: string }>(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<NsApiNameComponent>);
  ps = inject(PrismService);
  domSanitizer = inject(DomSanitizer);
  types = inject(TypesService);
  config = inject(ConfigService);
  property = computed(() => this.data.property);
  className = computed(() => this.data.className);

  dt = {
    zh_CN,
    en_US
  };

  get lang(): 'zh_CN' | 'en_US' {
    return this.config.lang as 'zh_CN' | 'en_US';
  }

  signalShort = computed(() => {
    const { signal } = this.property();
    return (signal as string).slice(0, 1).toUpperCase();
  });

  signalFirstUpper = computed(() => {
    const { signal } = this.property();
    return (signal as string).slice(0, 1).toUpperCase() + (signal as string).slice(1);
  });

  transformProperty = computed(() => {
    const { transform } = this.property();
    if (!transform) return;
    const prop = this.dt[this.lang][transform!];
    if (!prop) return;
    return prop;
  });

  showTypeInfo() {
    const { type } = this.property();
    if (type?.startsWith('X')) {
      this.types.reference(this.property()!.type!, this.className());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
