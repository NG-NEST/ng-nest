import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XOutletPrefix } from './outlet.property';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XOutletPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, XOutletModule],
      declarations: [TestXOutletComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXOutletComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXOutletComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: `
    <div class="row">
      <ng-container *xOutlet="temp1"></ng-container>
      <ng-template #temp1>模板</ng-template>
    </div>
    <div class="row">
      <ng-container *xOutlet="temp2; context: { text: '传递参数' }"></ng-container>
      <ng-template #temp2 let-text="text">{{ text }}</ng-template>
    </div>
    <div class="row">
      <ng-container *xOutlet="label">{{ label }}</ng-container>
    </div>
    <div class="row">
      <!-- 报错
        <ng-container *ngTemplateOutlet="label">{{ label }}</ng-container> 
      -->
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXOutletComponent {
  label = '字符串';
}
