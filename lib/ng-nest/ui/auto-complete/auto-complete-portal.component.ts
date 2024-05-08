import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener,
  TemplateRef,
  input,
  viewChild,
  signal,
  model,
  output
} from '@angular/core';
import { XAutoCompleteNode, XAutoCompletePortalPrefix } from './auto-complete.property';
import { Subject } from 'rxjs';
import { XConnectBaseAnimation, XPositionTopBottom } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: `${XAutoCompletePortalPrefix}`,
  standalone: true,
  imports: [XListComponent],
  templateUrl: './auto-complete-portal.component.html',
  styleUrls: ['./auto-complete-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XAutoCompletePortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating.emit(false);
    event.toState === 'void' && this.destroyed.emit();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating.emit(true);
  }
  list = viewChild.required('list', { read: XListComponent });

  data = input<XAutoCompleteNode[]>();
  value = input<any>();
  placement = input<XPositionTopBottom>();
  nodeTpl = input<TemplateRef<any>>();
  inputCom = input<XInputComponent>();
  keywordText = model<string>('');
  caseSensitive = input<boolean>(false);
  destroyed = output();
  animating = output<boolean>();
  nodeClick = output<XAutoCompleteNode>();
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  active = signal(-1);
  private unSubject = new Subject<void>();

  ngOnInit(): void {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.list().setUnActive(this.active());
    });
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      this.list().keydown(x);
    });
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onNodeClick(node: XAutoCompleteNode) {
    this.keywordText.set(node.label);
    this.nodeClick.emit(node);
  }

  onActive(num: number) {
    this.active.set(num);
  }

  onTabOut() {
    this.closeSubject.next();
  }
}
