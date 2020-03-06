import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTextRetractComponent } from './text-retract.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XTextRetractModule } from './text-retract.module';
import { FormsModule } from '@angular/forms';
import { XTextRetractPrefix } from './text-retract.type';

describe(XTextRetractPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTextRetractModule, XFenceModule, XIconModule],
      declarations: [TestXTextRetractComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTextRetractComponent>;
    let textRetract: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextRetractComponent);
      fixture.detectChanges();
      textRetract = fixture.debugElement.query(By.directive(XTextRetractComponent));
    });
    it('should create.', () => {
      expect(textRetract).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-text-retract [label]="label"></x-text-retract>
    </div>
  `
})
class TestXTextRetractComponent {
  label = `天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。`;
}
