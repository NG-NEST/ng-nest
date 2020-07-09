import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { XTheme, XConfigService, XColorsTheme } from '@ng-nest/ui/core';
import { XControl } from '@ng-nest/ui/form';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  formGroup = new FormGroup({});
  theme: XTheme = {
    colors: {}
  };
  controls: XControl[] = [
    { control: 'color-picker', id: 'primary', label: '主色' },
    { control: 'color-picker', id: 'background', label: '背景色' },
    { control: 'color-picker', id: 'success', label: '成功' },
    { control: 'color-picker', id: 'warning', label: '警告' },
    { control: 'color-picker', id: 'danger', label: '危险' },
    { control: 'color-picker', id: 'info', label: '信息' },
    { control: 'color-picker', id: 'text', label: '文字' },
    { control: 'color-picker', id: 'border', label: '边框' }
  ];
  constructor(private configService: XConfigService) {
    this.theme = this.configService.getTheme();
    this.controls.map((x: XControl) => {
      x.value = (this.theme.colors as XColorsTheme)[x.id];
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.formGroup.valueChanges.pipe(debounceTime(100)).subscribe((x) => {
      this.configService.setTheme({ colors: x });
    });
  }
}
