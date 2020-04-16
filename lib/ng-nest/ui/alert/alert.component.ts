import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { XAlertPrefix, XAlertProperty } from './alert.property';
import { XFadeAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XAlertPrefix}`,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XAlertComponent extends XAlertProperty implements OnInit, OnDestroy {
  private _unSubject = new Subject();

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
    this.setDuration();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    this.classMap = {
      [`${XAlertPrefix}-${this.type}`]: !XIsEmpty(this.type),
      [`x-${this.effect}`]: !XIsEmpty(this.effect),
      [`${XAlertPrefix}-icon-medium`]: !XIsEmpty(this.title) && !XIsEmpty(this.content) && !XIsEmpty(this.showIcon)
    };
  }

  setDuration() {
    if (this.duration) {
      of(true)
        .pipe(delay(this.duration), takeUntil(this._unSubject))
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
