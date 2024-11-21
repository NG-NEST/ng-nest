import { Component, signal } from '@angular/core';
import { XAnchorComponent, XAnchorInnerComponent } from '@ng-nest/ui/anchor';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-loading',
  imports: [XButtonComponent, XAnchorComponent, XAnchorInnerComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  html = signal(``);
  loadIndex = signal(0);

  onLoadData() {
    this.html.update((x) => {
      x += `<h1>1 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>2 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>3 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>4 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>5 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h1>Branching</h1>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>6 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h2>Branching</h2>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <p>This is a branch and a description.</p>
    <h1>7 Theme</h1>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
    <p>This is the topic-one information.</p>
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
      return x;
    });

    this.loadIndex.update((x) => ++x);

    if (this.loadIndex() % 2 === 0) {
      this.html.set(`<p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>`);
    }
  }
}
