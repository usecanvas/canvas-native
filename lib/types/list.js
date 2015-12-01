import Type     from './type';
import { wrap } from '../brackets';

export default class List extends Type {
  get groupType() {
    return this.type.replace(/-item$/, '');
  }

  get level() {
    return parseInt(this.match[2], 10);
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
      meta   : { level: this.level },
    };
  }

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

  static buildPrefix(markdown) {
    const whitespaceLength = markdown.match(/^( *)/)[1].length;
    const level            = Math.ceil(whitespaceLength / 2);
    return wrap(this.prefixBase + '-' + level.toString());
  }

  static matchMarkdown(markdown) {
    let mdMatch = markdown.match(this.markdownPattern);

    if (!mdMatch) {
      return null;
    }

    const nativeString = this.buildPrefix(markdown) +
      markdown.replace(/^ */, '');
    return this.match(nativeString);
  }
}
