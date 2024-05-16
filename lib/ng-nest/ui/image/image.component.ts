import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  computed,
  signal,
  effect,
  OnDestroy
} from '@angular/core';
import { XImageNode, XImagePrefix, XImageProperty } from './image.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from './image-preview.component';
import { XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { map } from 'rxjs';
import { XImageGroupComponent } from './image-group.component';
import { NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XImagePrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XOutletDirective],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImageComponent extends XImageProperty implements OnInit, OnDestroy {
  private dialog = inject(XDialogService);
  private i18n = inject(XI18nService);
  private group = inject(XImageGroupComponent, { optional: true });
  configService = inject(XConfigService);
  isError = signal(false);
  isLoaded = signal(false);

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.image!)), { initialValue: zh_CN.image });

  previewTextSignal = computed(() => {
    return this.previewText() || this.locale().previewText;
  });

  srcSignal = computed(() => {
    return this.isError() ? this.fallback() : this.src();
  });

  constructor() {
    super();
    effect(
      () => {
        this.src();
        this.isLoaded.set(false);
        this.isError.set(false);
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.group && this.group.addImage(this);
  }

  ngOnDestroy() {
    this.group && this.group.removeImage(this);
  }

  onPreview() {
    let data: XImageNode[] = [];
    if (this.group) {
      const activatedIndex = this.group.images().indexOf(this);
      data = this.group.images().map((x, index) => ({
        src: x.src(),
        alt: x.alt(),
        fallback: x.fallback(),
        activated: index === activatedIndex
      }));
    } else {
      data = [{ src: this.src(), alt: this.alt(), fallback: this.fallback() }];
    }
    this.dialog.create(XImagePreviewComponent, {
      width: '100%',
      height: '100%',
      className: 'x-image-preview-portal',
      data
    });
  }

  onError(event: ErrorEvent) {
    this.isError.set(false);
    this.error.emit(event);
  }

  onLoad(event: Event) {
    this.isLoaded.set(true);
    this.isError.set(false);
    this.load.emit(event);
  }
}
