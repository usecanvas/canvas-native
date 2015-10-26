import Type from './type';

export default class Paragraph extends Type {
  static get name() {
    return 'paragraph';
  }

  static get pattern() {
    return /^(.*)$/;
  }
}
