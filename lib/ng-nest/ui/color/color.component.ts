import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, computed, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { XColorPrefix, XColorProperty } from './color.property';
import { XToHex, XMixColors, XComputed } from '@ng-nest/ui/core';

@Component({
  selector: XColorPrefix,
  standalone: true,
  templateUrl: './color.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColorComponent extends XColorProperty {
  @HostBinding('class') className = XColorPrefix;
  private doc = inject(DOCUMENT);

  hexSignal = computed(() => {
    if (!this.hex() || this.hex() === 'var(--x-primary)') {
      return XComputed(this.doc.documentElement).getPropertyValue('--x-primary');
    }
    return this.hex();
  });

  colors = computed(() => {
    const colors = [];
    for (let amount of this.amounts()) {
      colors.push(XToHex(XMixColors(this.merge(), this.hexSignal().trim(), amount)));
    }
    return colors;
  });
}
