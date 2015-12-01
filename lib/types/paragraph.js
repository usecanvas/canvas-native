import Type from './type';

export default class Paragraph extends Type {
  get content() {
    return this.match[0];
  }

  toJSON() {
    return {
      content: this.content,
      type   : this.type,
    };
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.match[0];
    }

    return this.match[0] + '\n';
  }

  static get markdownPattern() {
    return this.nativePattern;
  }

  static get name() {
    return 'paragraph';
  }

  static get nativePattern() {
    return /^(.*)$/;
  }
}
