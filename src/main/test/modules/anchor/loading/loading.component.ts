import { Component } from '@angular/core';

@Component({
  selector: 'ex-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  html = ``;
  constructor() {}

  ngOnInit() {}
  onLoadData() {
    this.html += `<h1>1 Theme</h1>
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
    <p>This is a branch and a description.</p>`;
  }
}
