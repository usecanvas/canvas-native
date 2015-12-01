import Type     from './type';
import { wrap } from '../brackets';

const MARKDOWN_MATCH = '((>) (.*))';

export default class Blockquote extends Type {
  get content() {
    return this.match[4];
  }

  get groupType() {
    return 'blockquote';
  }

  get marker() {
    return this.match[3];
  }

  toJSON() {
    return {
      content: this.content,
      type   : this.type,
    }
  }

  toMarkdown(prev, next) {
    let result = this.match[2];

    if (next) {
      return result + '\n';
    }

    return result;
  }

  static get markdownPattern() {
    return new RegExp(`^${MARKDOWN_MATCH}`);
  }

  static get name() {
    return 'blockquote-item';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('blockquote')})${MARKDOWN_MATCH}$`);
  }

  static buildPrefix(/*markdown*/) {
    return wrap('blockquote');
  }
}
