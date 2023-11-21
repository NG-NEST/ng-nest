import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { XAlertPrefix, XAlertProperty } from './alert.property';
import { XFadeAnimation, XIsEmpty, XConfigService, XIsChange, XClearClass } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XButtonComponent } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XResizableDirective } from '@ng-nest/ui/resizable';

@Component({
  selector: `${XAlertPrefix}`,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    XIconComponent,
    XButtonComponent,
    XOutletDirective,
    XResizableDirective
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XAlertComponent extends XAlertProperty implements OnInit, OnDestroy {
  @ViewChild('alert') alert!: CdkDrag;
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
    this.setDuration();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type, effect, title, content, showIcon, draggable } = changes;
    XIsChange(type, effect, title, content, showIcon, draggable) && this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XAlertPrefix}-${this.type}`]: !XIsEmpty(this.type),
      [`x-${this.effect}`]: !XIsEmpty(this.effect),
      [`${XAlertPrefix}-icon-medium`]:
        !XIsEmpty(this.title) && !XIsEmpty(this.content) && !XIsEmpty(this.showIcon),
      [`${XAlertPrefix}-draggable`]: Boolean(this.draggable)
    };
  }

  setDuration() {
    if (this.duration) {
      of(true)
        .pipe(delay(Number(this.duration)), takeUntil(this._unSubject))
        .subscribe(() => {
          this.onClose();
        });
    }
  }

  onClose() {
    if (this.manual) {
      this.close?.emit();
    } else {
      this.hide = true;
      this.cdr.detectChanges();
    }
  }

  onCloseAnimationDone() {
    if (this.hide) {
      this.close?.emit();
    }
  }
}
