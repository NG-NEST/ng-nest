import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
  AfterViewInit,
  signal,
  effect
} from '@angular/core';
import { XThemeProperty } from './theme.property';
import {
  XConfigService,
  XColorsTheme,
  XTheme,
  X_THEME_COLOR_KEYS,
  X_THEME_COLORS,
  X_THEME_DARK_COLORS
} from '@ng-nest/ui/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { XControl, XFormComponent } from '@ng-nest/ui/form';
import { debounceTime, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { XI18nService, XI18nTheme, zh_CN } from '@ng-nest/ui/i18n';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'x-theme',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XSwitchComponent,
    XButtonComponent,
    XRowComponent,
    XColComponent,
    XFormComponent
  ],
  templateUrl: './theme.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XThemeComponent)]
})
export class XThemeComponent extends XThemeProperty implements OnInit, AfterViewInit, OnDestroy {
  public i18n = inject(XI18nService);
  configService = inject(XConfigService);
  themeService = this.configService.themeService;

  formGroup = signal(new UntypedFormGroup({}));
  theme = signal<XTheme>({ colors: {} });
  width = signal('45rem');
  beforeColors = signal<XColorsTheme>({});
  currentColors = signal<XColorsTheme>({});
  darkBeforeColors = signal<XColorsTheme>({});
  controls = signal<XControl[]>([
    { control: 'color-picker', id: 'primary', label: '主色', span: 5 },
    { control: 'color-picker', id: 'success', label: '成功', span: 5 },
    { control: 'color-picker', id: 'warning', label: '警告', span: 5 },
    { control: 'color-picker', id: 'danger', label: '危险', span: 5 },
    { control: 'color-picker', id: 'info', label: '信息', span: 5 },
    { control: 'color-picker', id: 'background', label: '背景', span: 5 },
    { control: 'color-picker', id: 'border', label: '边框', span: 5 },
    { control: 'color-picker', id: 'text', label: '文字', span: 5 }
  ]);

  override value = signal<XColorsTheme>({});

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.theme as XI18nTheme)), { initialValue: zh_CN.theme });

  private unSubject = new Subject<void>();

  override writeValue(value: XColorsTheme) {
    this.value.set(value);
    if (this.value() && Object.keys(this.value()).length > 0) {
      this.theme.set({
        colors: this.themeService.getDefineColors(
          Object.assign({}, X_THEME_COLORS, this.value()),
          '',
          this.dark() as boolean
        )
      });
      this.formGroup().patchValue(this.theme().colors as XColorsTheme);
    }
  }

  constructor() {
    super();
    effect(() => this.setControlsLabel());
    effect(() => {
      if (this.dark()) {
        this.themeService.changed.next('dark');
      } else {
        this.themeService.changed.next('light');
      }
    });
  }

  ngOnInit() {
    this.theme.set(this.configService.getTheme(true));
    this.setControls();
    this.setDefaultColors();
    this.controls.update((controls) => {
      controls.map((x: XControl) => {
        x.value = (this.theme().colors as XColorsTheme)[x.id];
      });
      return [...controls];
    });
  }

  ngAfterViewInit() {
    this.formGroup()
      .valueChanges.pipe(debounceTime(100), takeUntil(this.unSubject))
      .subscribe((x: XColorsTheme) => {
        this.beforeColors.set(this.currentColors());
        let changes = this.getChanges(x);
        if (this.isOneAndInColorKeys(changes)) {
          let [key, value] = Object.entries(changes)[0];
          let colors = !this.dark()
            ? this.themeService.setColorRoot(key, value, '')
            : this.themeService.setDarkColorRoot(key, value, '');
          Object.assign(x, colors);
          this.currentColors.set(x);
          this.formGroup().patchValue(x);
        } else {
          this.currentColors.set(x);
          this.value.set(x);
          this.configService.setTheme({ colors: x });
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setControlsLabel() {
    Object.keys(this.locale()).forEach((x) => {
      let control = this.controls().find((y) => y.id === x);
      if (control) {
        control.label = (this.locale() as any)[x];
        control.change && control.change();
      }
    });
  }

  setDefaultColors() {
    this.beforeColors.set(this.theme().colors as XColorsTheme);
    this.currentColors.set(this.beforeColors());
    this.darkBeforeColors = this.beforeColors;
  }

  setControls() {
    [...this.controls()].forEach((control, index) => {
      let addControls: XControl[] = [];
      control.span = !this.showDetail() ? 6 : 5;
      this.width.set(!this.showDetail() ? '36rem' : '45rem');
      for (let amount of this.amounts()) {
        addControls.push({
          control: 'color-picker',
          id: `${control.id}${this.themeService.getSuffix(amount)}`,
          label: '',
          hidden: !this.showDetail
        });
      }
      this.controls.update((x) => {
        x.splice(index * this.amounts().length + index + 1, 0, ...addControls);
        return [...x];
      });
    });
  }

  default() {
    this.dark.set(false);
    let colors = this.themeService.getDefineColors(Object.assign({}, X_THEME_COLORS), '', this.dark());
    this.beforeColors.set(colors);
    this.currentColors.set(colors);
    this.formGroup().patchValue(colors);
    this.defaultClick.emit(colors);
  }

  isOneAndInColorKeys(colors: XColorsTheme) {
    const keys = Object.keys(colors);
    if (keys.length === 1 && X_THEME_COLOR_KEYS.includes(keys[0])) {
      return true;
    }
    return false;
  }

  getChanges(colors: XColorsTheme) {
    let result: XColorsTheme = {};
    for (let color in colors) {
      if (colors[color] !== this.beforeColors()[color]) {
        result[color] = colors[color];
      }
    }
    return result;
  }

  darkChanges() {
    let colors = this.darkBeforeColors();
    if (this.dark()) {
      this.beforeColors.set(this.formGroup().value);
      this.darkBeforeColors.set(this.formGroup().value);
      colors = this.themeService.getDefineColors(
        Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), X_THEME_DARK_COLORS),
        '',
        this.dark()
      );
    }
    this.formGroup().patchValue(colors);
  }
}
