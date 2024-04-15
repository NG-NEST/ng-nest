import { Component, inject, signal } from '@angular/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppProp } from '@interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { PrismService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ns-reference',
  standalone: true,
  imports: [NgTemplateOutlet, XButtonComponent, XDialogModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class NsReferenceComponent {
  data = inject(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<NsReferenceComponent>);
  ps = inject(PrismService);
  domSanitizer = inject(DomSanitizer);
  prop = signal<AppProp>({});

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

  ngOnInit() {
    if (this.data?.prop?.example) {
      this.data.prop.example = this.marked.parse(this.data.prop.example) as string;
    }
    if (this.data?.prop?.description) {
      this.data.prop.description = this.marked.parse(this.data.prop.description) as string;
    }
    this.prop.set(this.data.prop);
  }

  close() {
    this.dialogRef.close();
  }
}
