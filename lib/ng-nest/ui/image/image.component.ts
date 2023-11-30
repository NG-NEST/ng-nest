import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XImageNode, XImagePrefix, XImageProperty } from './image.property';
import { XConfigService, XIsChange } from '@ng-nest/ui/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from './image-preview.component';
import { XI18nImage, XI18nService } from '@ng-nest/ui/i18n';
import { map, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { XImageGroupComponent } from './image-group.component';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XImagePrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XOutletDirective],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImageComponent extends XImageProperty implements OnInit, OnChanges {
  locale: XI18nImage = {};
  isError = false;
  isLoaded = false;
  private _unSubject = new Subject<void>();

  get getPreviewText() {
    return this.previewText || this.locale.previewText;
  }

  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(XDialogService);
  private i18n = inject(XI18nService);
  private group = inject(XImageGroupComponent, { optional: true });
  configService = inject(XConfigService);

  ngOnInit(): void {
    if (this.group) {
      this.group.addImage(this);
    }
    this.i18n.localeChange
      .pipe(
        map((x) => x.image as XI18nImage),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let { src } = changes;
    if (XIsChange(src)) {
      this.isLoaded = false;
      this.isError = false;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.group) {
      this.group.removeImage(this);
    }
  }

  onPreview() {
    let data: XImageNode[] = [];
    if (this.group) {
      const activatedIndex = this.group.images.indexOf(this);
      data = this.group.images.map((x, index) => ({
        src: x.src,
        alt: x.alt,
        fallback: x.fallback,
        activated: index === activatedIndex
      }));
    } else {
      data = [{ src: this.src, alt: this.alt, fallback: this.fallback }];
    }
    this.dialog.create(XImagePreviewComponent, {
      width: '100%',
      height: '100%',
      className: 'x-image-preview-portal',
      data: data
    });
  }

  onError(event: Event) {
    this.src = this.fallback;
    this.isError = true;
    this.cdr.detectChanges();
    this.error.emit(event);
  }

  onLoad(event: Event) {
    this.isLoaded = true;
    this.isError = false;
    this.cdr.detectChanges();
    this.load.emit(event);
  }
}
