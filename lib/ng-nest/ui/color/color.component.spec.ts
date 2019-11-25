import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XColorComponent } from "./color.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XGridModule } from "@ng-nest/ui/grid";
import { XColorModule } from "./color.module";
import { XColorPrefix } from "./color.type";

describe(XColorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XColorModule, XGridModule],
      declarations: [TestXColorComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXColorComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XColorComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-color",
  template: `
    <x-row space="1">
      <x-col span="12"><x-color label="Primary"></x-color></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6"><x-color label="Success" hex="#67c23a" [amounts]="[0.8, 0.9]"></x-color></x-col>
      <x-col span="6"><x-color label="Warning" hex="#e6a23c" [amounts]="[0.8, 0.9]"></x-color></x-col>
      <x-col span="6"><x-color label="Danger" hex="#f56c6c" [amounts]="[0.8, 0.9]"></x-color></x-col>
      <x-col span="6"><x-color label="Info" hex="#909399" [amounts]="[0.8, 0.9]"></x-color></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6"><x-color label="主要文字" hex="#303133" amounts=""></x-color></x-col>
      <x-col span="6"><x-color class="black" label="一级边框" hex="#dcdfe6" amounts=""></x-color></x-col>
      <x-col span="6"><x-color label="基础黑色" hex="#000000" amounts=""></x-color></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6"><x-color label="常规文字" hex="#606266" amounts=""></x-color></x-col>
      <x-col span="6"><x-color class="black" label="二级边框" hex="#e4e7ed" amounts=""></x-color></x-col>
      <x-col span="6"><x-color class="border black" label="基础白色" hex="#ffffff" amounts=""></x-color></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6"><x-color label="次要文字" hex="#909399" amounts=""></x-color></x-col>
      <x-col span="6"><x-color class="black" label="三级边框" hex="#ebeef5" amounts=""></x-color></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6"><x-color label="占位文字" hex="#c0c4cc" amounts=""></x-color></x-col>
      <x-col span="6"><x-color class="black" label="四级边框" hex="#f2f6fc" amounts=""></x-color></x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin: 1rem 0;
      }
      x-row:first-child {
        margin-top: 0;
      }
      x-row:last-child {
        margin-bottom: 0;
      }
      x-color.border {
        border: 1px solid var(--x-border);
      }
      x-color.black {
        color: var(--x-text);
      }
    `
  ]
})
class TestXColorComponent {}
