import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  input,
  effect,
  TemplateRef
} from '@angular/core';
import { XMenuNodeProperty, XMenuNodePrefix, XMenuNode } from './menu.property';
import { XIconComponent } from '@ng-nest/ui/icon';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { XMenuComponent } from './menu.component';

@Component({
  selector: `${XMenuNodePrefix}`,
  imports: [NgTemplateOutlet, XIconComponent, RouterModule],
  templateUrl: './menu-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuNodeComponent extends XMenuNodeProperty {
  menu = inject(XMenuComponent, { optional: true })!;
  routerLink = input<string>();
  leaf = input<boolean>();
  icon = input<string>();
  label = input<string>();
  open = input<boolean>();
  id = input<any>();
  node = input<XMenuNode>();
  nodeTpl = input<TemplateRef<any>>();

  private elementRef = inject(ElementRef);

  constructor() {
    super();
    effect(() => {
      if (this.menu.activatedId() === this.id()) {
        this.menu.activatedElementRef.set(this.elementRef);
      }
    });
  }
}
