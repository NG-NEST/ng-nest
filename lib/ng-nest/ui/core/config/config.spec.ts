import { TestBed } from '@angular/core/testing';
import { XButtonComponent, XButtonModule } from '@ng-nest/ui/button';
import { X_CONFIG, XConfig } from './config';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const config: XConfig = {
  components: {
    button: {
      size: 'large',
      type: 'success'
    }
  }
};

@Component({
  imports: [XButtonModule],
  template: `<x-button>全局配置</x-button>`
})
class XTestConfigComponent {}

xdescribe('x-config', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestConfigComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: X_CONFIG,
          useValue: config
        },
        provideZonelessChangeDetection()
      ]
    });
    TestBed.compileComponents();
  });

  it('button config', () => {
    let fixture = TestBed.createComponent(XTestConfigComponent);
    let buttonEle = fixture.debugElement.query(By.css('button'));
    let buttonComponent = buttonEle.componentInstance as XButtonComponent;
    fixture.detectChanges();
    expect(buttonComponent.size()).toBe('large');
    expect(buttonEle.nativeElement.classList).toContain('x-size-large');
    expect(buttonComponent.type()).toBe('success');
    expect(buttonEle.nativeElement.classList).toContain('x-button-success');
  });
});
