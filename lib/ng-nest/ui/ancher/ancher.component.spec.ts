import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAncherComponent } from './ancher.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAncherModule } from './ancher.module';
import { XAncherPrefix } from './ancher.type';

describe(XAncherPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XAncherModule],
      declarations: [TestXAncherComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAncherComponent>;
    let ancher: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAncherComponent);
      fixture.detectChanges();
      ancher = fixture.debugElement.query(By.directive(XAncherComponent));
    });
    it('should create.', () => {
      expect(ancher).toBeDefined();
    });
  });
});

const htmlTemplate = `
  <h1>1 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>2 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>3 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>4 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>5 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.

  </p>
  <div><h5>Branching</h5></div>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>6 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h1>7 Theme</h1>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <p>
    This is the topic-one information.
  </p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <h2>Branching</h2>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>
  <p>This is a branch and a description.</p>`;

@Component({
  template: `
    <div #scroll class="row scroll">
      <x-ancher [scroll]="scroll">
        ${htmlTemplate}
      </x-ancher>
    </div>
  `,
  styles: [
    `
      .row.scroll {
        height: 40rem;
        width: 100%;
        overflow: auto;
        border-radius: 0.125rem;
        background: rgba(0, 0, 0, 0.02);
      }
    `
  ]
})
class TestXAncherComponent {}
