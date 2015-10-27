import Type from './type';

export default class Paragraph extends Type {
  toMarkdown(prev, next) {
    if (!next) {
      return this.match[0];
    }

    return this.match[0] + '\n';
  }

  static get name() {
    return 'paragraph';
  }

  static get pattern() {
    return /^(.*)$/;
  }
}
