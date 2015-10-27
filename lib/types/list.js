import Type from './type';

export default class List extends Type {
  toMarkdown(prev, next) {
    if (next && next.type !== this.type) {
      return this.match[3] + '\n';
    }

    return this.match[3];
  }

  get level() {
    return parseInt(this.match[2], 10);
  }
}
