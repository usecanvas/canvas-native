import Type from './type';

export default class Heading extends Type {
  get level() {
    return this.match[1].length;
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.match[0];
    }

    return this.match[0] + '\n';
  }

  static get name() {
    return 'heading';
  }

  static get pattern() {
    return new RegExp(`^(#{1,6}) (.*)$`);
  }
}
