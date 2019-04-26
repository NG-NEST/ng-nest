export class Log {
  static UrlNotSafeError(url: string) {
    console.error(`The url "${url}" is unsafe.`);
  }
  static SVGTagNotFoundWarn() {
    console.warn(`<svg> tag not found.`);
  }
  static IconTypeNotFoundWarn() {
    console.warn(`icon type not found.`);
  }
}
