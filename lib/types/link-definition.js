import Type from './type';

export default class LinkDefinition extends Type {
  get label() {
    return this.match[2];
  }

  get url() {
    return this.match[3];
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.match[0];
    }

    return this.match[0] + '\n';
  }

  static get name() {
    return 'link-definition';
  }

  static get pattern() {
    return /^(\[(\S+)\]: (.+))$/;
  }
}
