import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  OnInit,
  input
} from '@angular/core';
import { XMenuNodeProperty, XMenuNodePrefix } from './menu.property';
import { XIconComponent } from '@ng-nest/ui/icon';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XMenuNodePrefix}`,
  standalone: true,
  imports: [NgTemplateOutlet, XIconComponent, RouterModule],
  templateUrl: './menu-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuNodeComponent extends XMenuNodeProperty implements OnInit {
  menu = input.required<any>();
  routerLink = input<string>();
  leaf = input<boolean>();
  icon = input<string>();
  label = input<string>();
  open = input<boolean>();
  id = input<any>();
  
  private elementRef = inject(ElementRef);

  ngOnInit() {
    if (this.menu().activatedId() == this.id()) {
      this.menu().activatedElementRef = this.elementRef;
    }
  }
}
