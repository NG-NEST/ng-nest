import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { XIsArray, XIsString } from '@ng-nest/ui/core';

@Injectable({ providedIn: 'root' })
export class PrismService {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  prism = this.isBrowser ? (window as any)['Prism'] : null;

  init() {
    if (!this.prism) return;
    const checkString = (str: string) => {
      const regex = /^(['"`])(.*?)\1$/;
      return regex.test(str);
    };
    const checkInputOutput = (str: string) => {
      const regex = /^(\[[^\]]*\]|\([^)]*\))$/;
      return regex.test(str);
    };
    const checkTokens = (tokens: any[], handle: (token: any) => any) => {
      const result: any[] = [];
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const ts = handle(token);

        if (XIsArray(token.content)) {
          ts.content = checkTokens(token.content, handle);
        }

        result.push(ts);
      }
      return result;
    };
    this.prism.hooks.add('after-tokenize', (env: any) => {
      let { tokens, language } = env;
      if (language === 'typescript') {
        env.tokens = checkTokens(tokens, (token: any) => {
          if (XIsString(token)) {
            const tstring = token.trim();
            let name = 'property';
            if (checkString(tstring)) {
              name = 'string';
            }
            return new this.prism.Token(name, token);
          } else {
            return token;
          }
        });
      } else if (language === 'html') {
        env.tokens = checkTokens(tokens, (token: any) => {
          if (XIsString(token) && checkInputOutput(token)) {
            const start = token.slice(0, 1);
            const end = token.slice(token.length - 1);
            const newstr = token.slice(1, token.length - 1);
            return new this.prism.Token('attr-name', [
              new this.prism.Token('attr-equals', start),
              new this.prism.Token('attr-name', newstr),
              new this.prism.Token('attr-equals', end)
            ]);
          } else {
            return token;
          }
        });
      }
    });
  }
}
