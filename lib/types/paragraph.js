import Type from './type';

export default class Paragraph extends Type {
  toJSON() {
    return {
      content: this.match[0],
      type   : this.type,
    };
  }

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
