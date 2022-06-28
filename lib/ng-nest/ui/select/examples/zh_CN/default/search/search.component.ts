import { Component } from '@angular/core';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
  data = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model = '';

  change(_event: any) {
    console.log(_event);
  }
}
