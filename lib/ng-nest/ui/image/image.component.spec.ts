import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XImageComponent } from './image.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XImageComponent } from '@ng-nest/ui/image';
import { FormsModule } from '@angular/forms';
import { XImagePrefix } from './image.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XImagePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        XImageComponent,
        XButtonComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
        XIconComponent
      ],
      declarations: [TestXImageComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXImageComponent>;
    let image: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXImageComponent);
      fixture.detectChanges();
      image = fixture.debugElement.query(By.directive(XImageComponent));
    });
    it('should create.', () => {
      expect(image).toBeDefined();
    });
  });
});

@Component({
  template: ` <x-image></x-image> `
})
class TestXImageComponent {
  constructor() {}
}
