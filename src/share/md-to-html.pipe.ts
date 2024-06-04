import { Pipe, PipeTransform } from '@angular/core';
import { PrismService } from '@services';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { XIsEmpty } from '@ng-nest/ui/core';

@Pipe({
  name: 'mdToHtml',
  standalone: true
})
export class MdToHtmlPipe implements PipeTransform {
  marked = new Marked(
    {
      gfm: true,
      breaks: true
    },
    markedHighlight({
      langPrefix: 'language-',
      highlight: (code, lang) => {
        if (this.ps.prism.languages[lang]) {
          return this.ps.prism.highlight(code, this.ps.prism.languages[lang], lang);
        }
        return code;
      }
    })
  );
  constructor(private ps: PrismService) {}

  transform(value: any) {
    if (XIsEmpty(value)) return '';
    return this.marked.parse(value) as string;
  }
}
