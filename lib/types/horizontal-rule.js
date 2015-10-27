import Type from './type';

export default class HorizontalRule extends Type {
  toMarkdown(prev, next) {
    if (!next) {
      return this.match[0];
    }

    return this.match[0] + '\n';
  }

  static get name() {
    return 'horizontal-rule';
  }

  static get pattern() {
    return /^((?:- ?){3,})$/;
  }
}
