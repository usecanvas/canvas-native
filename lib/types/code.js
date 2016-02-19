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

    if (!prev ||
        ((prev.type !== this.type) ||
         (prev.language !== this.language))) {
      result = `\`\`\`${this.language || ''}\n${result}`;
    }

    if (!next) {
      result = `${result}\n\`\`\``;
    }

    if (next &&
        ((next.type !== this.type) ||
         (next.language !== this.language))) {
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

  static buildPrefix(markdown, { groupLang } = {}) {
    if (groupLang) {
      return wrap(`code-${groupLang}`);
    } else {
      return wrap('code');
    }
  }

  static matchMarkdown(markdown, { groupType, groupLang } = {}) {
    if (groupType !== 'code') {
      return null;
    }

    return super.matchMarkdown(...arguments);
  }
}
