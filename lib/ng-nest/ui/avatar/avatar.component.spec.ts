import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XAvatarComponent } from "./avatar.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XAvatarModule } from "./avatar.module";
import { FormsModule } from "@angular/forms";
import { XAvatarPrefix } from "./avatar.type";

describe(XAvatarPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XAvatarModule, XFenceModule, XIconModule],
      declarations: [TestXAvatarComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAvatarComponent>;
    let avatar: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAvatarComponent);
      fixture.detectChanges();
      avatar = fixture.debugElement.query(By.directive(XAvatarComponent));
    });
    it("should create.", () => {
      expect(avatar).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-avatar size="large" [src]="circleSrc"></x-avatar>
      <x-avatar size="medium" [src]="circleSrc"></x-avatar>
      <x-avatar [src]="circleSrc"></x-avatar>
      <x-avatar size="small" [src]="circleSrc"></x-avatar>
      <x-avatar size="mini" [src]="circleSrc"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="large" shape="square" [src]="circleSrc"></x-avatar>
      <x-avatar size="medium" shape="square" [src]="circleSrc"></x-avatar>
      <x-avatar shape="square" [src]="circleSrc"></x-avatar>
      <x-avatar size="small" shape="square" [src]="circleSrc"></x-avatar>
      <x-avatar size="mini" shape="square" [src]="circleSrc"></x-avatar>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
      }
      .row:not(:first-child) {
        margin-top: 0.5rem;
      }
      .row x-avatar:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXAvatarComponent {
  circleSrc = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
}
