import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XCoversationsProperty } from './coversations.property';
import { XListComponent } from '@ng-nest/ui/list';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'x-coversations',
  templateUrl: './coversations.component.html',
  styleUrls: ['./coversations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, XListComponent],
  providers: [XValueAccessor(XCoversationsComponent)]
})
export class XCoversationsComponent extends XCoversationsProperty {
  valueChange(value: any) {
    this.onChange && this.onChange(value);
  }
}
