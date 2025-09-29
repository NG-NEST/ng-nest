import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { XWelcomeProperty } from './welcome.property';
import { XIsString } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: 'x-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XOutletDirective]
})
export class XWelcomeComponent extends XWelcomeProperty {
  isStringIcon = computed(() => XIsString(this.icon()));
}
