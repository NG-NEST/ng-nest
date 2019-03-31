import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmInputComponent } from './nm-input.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NmInputModule } from './nm-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputOption, InputSizeEnum } from './nm-input.type';

describe('input', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmInputModule, FormsModule, ReactiveFormsModule],
      declarations: [
        NmTestInputWithNmInputComponent
      ]
    })
      .compileComponents();
  }));

  describe('single input', () => {
    describe('input with nm-input', () => {
      let fixture: ComponentFixture<NmTestInputWithNmInputComponent>;
      let testComponent: NmTestInputWithNmInputComponent;
      let inputElement: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NmTestInputWithNmInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NmInputComponent));
      });
      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('nm-input-disabled');
        testComponent.option = { disabled: true };
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('nm-input-disabled');
      });
      it('should size work', () => {
        testComponent.option = { size: InputSizeEnum.Small };
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('nm-input-sm');
        testComponent.option = { size: InputSizeEnum.Large };
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('nm-input-lg');
      });
    })
  })
});

@Component({
  selector: 'nm-test-input-width-input',
  template: `
    <nm-input [option]="option"></nm-input>
  `
})
export class NmTestInputWithNmInputComponent {
  option: InputOption = {};
  constructor() { }
  ngOnInit() {

  }
}
