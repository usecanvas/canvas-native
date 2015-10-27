import Type     from './type';
import { wrap } from '../brackets';

export default class Code extends Type {
  toMarkdown(prev, next) {
    let result  = this.match[2];

    if (!prev || prev.type !== this.type) {
      result = `\`\`\`\n${result}`;
    }

    if (!next) {
      result = `${result}\n\`\`\``;
    }

    if (next && next.type !== this.type) {
      result = `${result}\n\`\`\`\n`;
    }

    return result;
  }

  static get name() {
    return 'code';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('code')})(.*)$`);
  }
}
