import Type from './type';

export default class Heading extends Type {
  get level() {
    return this.match[1].length;
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.match[0],
      meta   : { level: this.level },
    }
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
    return 'heading';
  }

  static get nativePattern() {
    return new RegExp(`^(#{1,6}) (.*)$`);
  }
}
