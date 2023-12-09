import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
  OnDestroy
} from '@angular/core';
import { XTextRetractPrefix, XTextRetractProperty } from './text-retract.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: `${XTextRetractPrefix}`,
  standalone: true,
  imports: [CommonModule, FormsModule, XLinkComponent, XI18nPipe],
  templateUrl: './text-retract.component.html',
  styleUrls: ['./text-retract.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTextRetractComponent extends XTextRetractProperty implements OnInit, OnChanges, OnDestroy {
  displayValue!: string;
  retract: boolean = false;
  unfold: boolean = true;

  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setDisplayValue();
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges) {
    const { content } = changes;
    XIsChange(content) && this.setDisplayValue();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setDisplayValue() {
    if (this.content && this.content.length > (this.max as number)) {
      this.displayValue = this.content.substring(0, Number(this.max));
      this.retract = true;
    } else {
      this.displayValue = this.content as string;
    }
    this.cdr.markForCheck();
  }

  toggle() {
    this.unfold = !this.unfold;
    if (this.unfold) {
      this.displayValue = (this.content as string).substring(0, Number(this.max));
    } else {
      this.displayValue = this.content as string;
    }
    this.cdr.detectChanges();
  }
}
