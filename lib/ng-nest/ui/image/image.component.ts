import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  Optional,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XImageNode, XImagePrefix, XImageProperty } from './image.property';
import { XConfigService, XIsChange } from '@ng-nest/ui/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from './image-preview.component';
import { XI18nImage, XI18nService } from '@ng-nest/ui/i18n';
import { map, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { XImageGroupComponent } from './image-group.component';

@Component({
  selector: `${XImagePrefix}`,
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
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public dialog: XDialogService,
    public i18n: XI18nService,
    @Optional() public group: XImageGroupComponent
  ) {
    super();
  }

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
    }
  }

  onPreview() {
    let data: XImageNode[] = [];
    if (this.group) {
      const activatedIndex = this.group.images.indexOf(this);
      data = this.group.images.map((x, index) => ({ src: x.src, alt: x.alt, fallback: x.fallback, activated: index === activatedIndex }));
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

  onError() {
    this.src = this.fallback;
    this.isError = true;
  }

  onLoad() {
    this.isLoaded = true;
  }
}
