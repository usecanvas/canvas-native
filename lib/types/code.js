import Type     from './type';
import { brackets, wrap } from '../brackets';

export default class Code extends Type {
  get content() {
    return this.match[3];
  }

  get groupType() {
    return 'code-block';
  }

  get language() {
    return this.match[2] || null;
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
      meta   : {
        language: this.language
      }
    };
  }

  toMarkdown(prev, next) {
    let result  = this.content;

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
    const prefix = wrap(`code(?:-([^${brackets[1]}]*))?`)
    return new RegExp(`^(${prefix})(.*)$`);
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
