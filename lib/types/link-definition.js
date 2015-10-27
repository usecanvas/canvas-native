import Type from './type';

export default class LinkDefinition extends Type {
  get label() {
    return this.match[2];
  }

  get url() {
    return this.match[3];
  }

  static get name() {
    return 'link-definition';
  }

  static get pattern() {
    return /^(\[(\S+)\]: (.+))$/;
  }
}
