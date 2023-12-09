import { Component, OnInit } from '@angular/core';
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ex-async',
  standalone: true,
  imports: [CommonModule, FormsModule, XButtonComponent, XRadioComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent implements OnInit {
  data!: XData<XRadioNode>;
  model = 'QQ';
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // Replace with http request, or directly define data as Observable object
      setTimeout(() => {
        this.model = 'WeChat';
        this.loading = false;
        x.next(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
        x.complete();
      }, 2000);
    });
  }
  constructor() {}

  ngOnInit() {}
}
