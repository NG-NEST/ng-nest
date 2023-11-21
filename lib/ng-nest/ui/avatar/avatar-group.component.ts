import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XAvatarGroupPrefix, XAvatarGroupProperty } from './avatar.property';

@Component({
  selector: `${XAvatarGroupPrefix}`,
  standalone: true,
  imports: [XAvatarGroupProperty],
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarGroupComponent extends XAvatarGroupProperty {
  @HostBinding('class.x-avatar-group') _has = true;
}
