import Type     from './type';
import { wrap } from '../brackets';

export default class Title extends Type {
  toJSON() {
    return {
      type   : this.type,
      content: this.match[2],
    }
  }

  toMarkdown(prev, next) {
    const result = `# ${this.match[2]}`;

    if (!next) {
      return result;
    }

    return result + '\n';
  }

  static get name() {
    return 'title';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('doc-heading')})(.*)$`);
  }
}
