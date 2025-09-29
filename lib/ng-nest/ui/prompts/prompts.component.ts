import { ChangeDetectionStrategy, Component, signal, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { XPromptsProperty, XPromptsNode } from './prompts.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIsChange, XSetData } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'x-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XOutletDirective, XIconComponent]
})
export class XPromptsComponent extends XPromptsProperty {
  nodes = signal<XPromptsNode[]>([]);

  unSubject = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  onItemClick(node: XPromptsNode) {
    this.itemClick.emit(node);
  }

  private setData() {
    XSetData<XPromptsNode>(this.data(), this.unSubject, true).subscribe((x) => {
      this.nodes.set(x);
    });
  }
}
