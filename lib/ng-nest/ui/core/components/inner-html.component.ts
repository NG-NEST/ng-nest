import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: `[x-inner-html], x-inner-html`,
  standalone: true,
  template: '<div class="x-inner-html" [innerHTML]="innerHtml()" [style]="style()"></div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInnerHTMLComponent {
  html = input.required<string>();
  style = input();
  innerHtml = computed(() => this.domSanitizer.bypassSecurityTrustHtml(this.html()));
  private domSanitizer = inject(DomSanitizer);
}
