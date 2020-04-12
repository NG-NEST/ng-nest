import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPaginationComponent } from './pagination.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XPaginationPrefix } from './pagination.property';

describe(XPaginationPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPaginationModule],
      declarations: [TestXPaginationComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPaginationComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPaginationComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPaginationComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(XPaginationPrefix);
    });
  });
});

@Component({
  selector: 'test-x-pagination',
  template: ` <x-pagination [index]="index" [size]="size" [total]="total" (indexChange)="change($event)"></x-pagination> `
})
class TestXPaginationComponent {
  index = 1;
  size = 10;
  total = 25;
  change(index: number) {
    console.log(index);
  }
}
