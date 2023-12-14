import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { XDrawerContainerProperty, X_DRAWER_CONTAINER } from './drawer.property';

@Component({
  selector: 'x-drawer-container',
  standalone: true,
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: X_DRAWER_CONTAINER,
      useExisting: XDrawerContainerComponent
    }
  ]
})
export class XDrawerContainerComponent extends XDrawerContainerProperty {
  @HostBinding('class.x-drawer-container') _has = true;
}
