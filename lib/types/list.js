import Type from './type';

export default class List extends Type {
  toMarkdown(prev, next) {
    let result = this.match[3];

    const level = this.level;
    for (let i = 0; i < level; i++) {
      result = `  ${result}`;
    }

    if (next && next.type !== this.type) {
      return result + '\n';
    }

    return result;
  }

  get level() {
    return parseInt(this.match[2], 10);
  }
}
