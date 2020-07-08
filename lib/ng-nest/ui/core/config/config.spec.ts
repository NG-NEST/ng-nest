import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { XButtonModule, XButtonComponent } from '@ng-nest/ui/button';
import { XConfigService } from './config.service';
import { X_CONFIG, XConfig } from './config';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSize } from '../interfaces';

@Component({
  template: ` <x-button [size]="size">全局配置</x-button> `
})
class NzGlobalConfigTestBasicComponent {
  size?: XSize;

  constructor(public configService: XConfigService) {}
}

describe('x-config', () => {
  let fixture: ComponentFixture<NzGlobalConfigTestBasicComponent>;
  let testComponent: NzGlobalConfigTestBasicComponent;
  let button: DebugElement;
  let buttonEl: HTMLButtonElement;
  let buttonInner: HTMLButtonElement | null;
  let config: XConfig = {
    button: {
      size: 'large',
      type: 'primary',
      plain: true,
      round: true
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XButtonModule],
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
