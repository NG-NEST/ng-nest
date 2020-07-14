import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { XButtonModule, XButtonComponent } from '@ng-nest/ui/button';
import { XConfigService } from './config.service';
import { X_CONFIG, XConfig } from './config';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSize } from '../interfaces';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { XLinkModule } from '@ng-nest/ui/link';

@Component({
  template: ` <x-button [size]="size">全局配置</x-button>
    <x-dropdown [data]="data">
      <x-link type="primary" icon="fto-chevron-down" iconRight> 下拉菜单 </x-link>
    </x-dropdown>`
})
class NzGlobalConfigTestBasicComponent {
  size?: XSize;
  data = ['用户管理', '角色管理', '组织管理', '模块管理', '日志管理'];
  constructor(public configService: XConfigService) {}
}

describe('x-config', () => {
  let fixture: ComponentFixture<NzGlobalConfigTestBasicComponent>;
  let testComponent: NzGlobalConfigTestBasicComponent;
  let button: DebugElement;
  let buttonEl: HTMLButtonElement;
  let buttonInner: HTMLButtonElement | null;
  let config: XConfig = {
    components: {
      button: {
        size: 'large',
        type: 'primary',
        plain: true,
        round: true
      },
      dropdown: {
        trigger: 'click'
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XButtonModule, XDropdownModule, XLinkModule],
      declarations: [NzGlobalConfigTestBasicComponent],
      providers: [
        {
          provide: X_CONFIG,
          useValue: config
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzGlobalConfigTestBasicComponent);
    testComponent = fixture.debugElement.componentInstance;
    button = fixture.debugElement.query(By.directive(XButtonComponent));
    buttonEl = button.nativeElement;
    buttonInner = buttonEl.querySelector('.x-button');
  });
  it('should config work', () => {
    fixture.detectChanges();
    expect(buttonInner?.classList).toContain('x-size-large');
  });
});
