import { Directive, ElementRef, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { XI18nService } from './i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { XIsChange } from '@ng-nest/ui/core';

@Directive({
  selector: '[x-i18n]'
})
export class XI18nDirective implements OnChanges, OnDestroy {
  @Input('x-i18n') path!: string;
  private _unSubject = new Subject<void>();
  constructor(private locale: XI18nService, private elementRef: ElementRef) {
    this.locale.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.setLocale());
  }

  ngOnChanges(changes: SimpleChanges) {
    const { path } = changes;
    XIsChange(path) && this.setLocale();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.complete();
  }

  setLocale() {
    if (typeof this.path !== 'undefined') {
      const content = this.locale.translate(this.path);
      this.elementRef.nativeElement.innerText = content;
    }
  }
}
