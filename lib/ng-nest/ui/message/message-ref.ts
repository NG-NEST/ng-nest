import { XMessageOption } from './message.property';

// TODO: add more function
export class XMessageRef {
  option: XMessageOption;
  constructor(option: XMessageOption) {
    if (!option.id) option.id = `${new Date().getTime()}`;
    this.option = option;
  }
  close = () => {};
  opened = () => {};
  closeAll = () => {};
  update = (_option: XMessageOption) => {};
}
