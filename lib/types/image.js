import Type     from './type';
import { wrap } from '../brackets';

export default class Image extends Type {
  toJSON() {
    return {
      type   : this.type,
      content: this.match[2],
    }
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.match[2];
    }

    return this.match[2] + '\n';
  }

  static get name() {
    return 'image';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('image')})(.*)$`);
  }
}
