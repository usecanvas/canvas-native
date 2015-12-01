import Type from './type';

export default class HorizontalRule extends Type {
  get content() {
    return '';
  }

  get isSummarized() {
    return false;
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
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
    return 'horizontal-rule';
  }

  static get nativePattern() {
    return /^((?:- ?){3,})$/;
  }
}
