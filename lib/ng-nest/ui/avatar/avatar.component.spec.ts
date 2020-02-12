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
      <x-avatar size="large" [src]="src"></x-avatar>
      <x-avatar size="medium" [src]="src"></x-avatar>
      <x-avatar [src]="src"></x-avatar>
      <x-avatar size="small" [src]="src"></x-avatar>
      <x-avatar size="mini" [src]="src"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="large" shape="square" [src]="src"></x-avatar>
      <x-avatar size="medium" shape="square" [src]="src"></x-avatar>
      <x-avatar shape="square" [src]="src"></x-avatar>
      <x-avatar size="small" shape="square" [src]="src"></x-avatar>
      <x-avatar size="mini" shape="square" [src]="src"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="large" [icon]="icon"></x-avatar>
      <x-avatar size="medium" [icon]="icon"></x-avatar>
      <x-avatar [icon]="icon"></x-avatar>
      <x-avatar size="small" [icon]="icon"></x-avatar>
      <x-avatar size="mini" [icon]="icon"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="large" [label]="label"></x-avatar>
      <x-avatar size="medium" [label]="label"></x-avatar>
      <x-avatar [label]="label"></x-avatar>
      <x-avatar size="small" [label]="label"></x-avatar>
      <x-avatar size="mini" [label]="label"></x-avatar>
    </div>
    <div class="row">
      <x-avatar src="https://empty"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="large" [src]="srcFit" fit="fill"></x-avatar>
      <x-avatar size="large" [src]="srcFit" fit="contain"></x-avatar>
      <x-avatar size="large" [src]="srcFit" fit="cover"></x-avatar>
      <x-avatar size="large" [src]="srcFit" fit="none"></x-avatar>
      <x-avatar size="large" [src]="srcFit" fit="scale-down"></x-avatar>
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
  src = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
  srcFit = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  icon = "fto-user";
  label = "王";
}
