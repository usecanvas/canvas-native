import Type     from './type';
import { wrap } from '../brackets';

export default class Title extends Type {
  get content() {
    return this.match[2]
  }

  get isSummarized() {
    return false;
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
    }
  }

  toMarkdown(prev, next) {
    const result = `# ${this.match[2]}`;

    if (!next) {
      return result;
    }

    return result + '\n';
  }

  static get markdownPattern() {
    return /^# (.*)$/;
  }

  static get name() {
    return 'title';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('doc-heading')})(.*)$`);
  }

  static buildPrefix() {
    return wrap('doc-heading');
  }

  static matchMarkdown(markdown, { hasTitle } = {}) {
    if (hasTitle) {
      return null;
    }

    let mdMatch = markdown.match(this.markdownPattern);

    if (!mdMatch) {
      return null;
    }

    const nativeString = this.buildPrefix(markdown) +
      markdown.replace(/^# /, '');
    return this.match(nativeString);
  }
}
