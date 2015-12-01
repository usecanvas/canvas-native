import Type     from './type';
import { wrap } from '../brackets';

export default class Code extends Type {
  get content() {
    return this.match[2];
  }

  get groupType() {
    return 'code-block';
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
    };
  }

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

  static get markdownPattern() {
    return /^(.*)$/;
  }

  static get name() {
    return 'code';
  }

  static get nativePattern() {
    return new RegExp(`^(${this.buildPrefix()})(.*)$`);
  }

  static buildPrefix() {
    return wrap('code');
  }

  static matchMarkdown(markdown, { groupType } = {}) {
    if (groupType !== 'code') {
      return null;
    }

    return super.matchMarkdown(...arguments);
  }
}
