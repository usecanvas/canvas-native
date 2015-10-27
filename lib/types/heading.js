import Type from './type';

export default class Heading extends Type {
  get level() {
    return this.match[1].length;
  }

  static get name() {
    return 'code';
  }

  static get pattern() {
    return new RegExp(`^(#{1,6}) (.*)$`);
  }
}
