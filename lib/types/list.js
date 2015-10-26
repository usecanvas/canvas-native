import Type from './type';

export default class List extends Type {
  get level() {
    return parseInt(this.match[2], 10);
  }
}
