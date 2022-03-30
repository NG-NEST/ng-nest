import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { XResizableModule } from '@ng-nest/ui/resizable';
import { XResizablePrefix } from './resizable.property';

describe(XResizablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XResizableModule],
      declarations: [TestXResizableComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXResizableComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXResizableComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: ``,
  styles: [``]
})
class TestXResizableComponent {}
