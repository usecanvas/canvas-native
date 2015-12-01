import Type     from './type';
import { wrap } from '../brackets';

export default class Image extends Type {
  get content() {
    return this.match[2];
  }

  toJSON() {
    return {
      type   : this.type,
      content: this.content,
    }
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.match[2];
    }

    return this.match[2] + '\n';
  }

  static get markdownPattern() {
    return /^(?:!\[.*?\]\()?(https?:\/\/.+\/.+\.(?:gif|jpg|jpeg|png)(?:\?[^\s)]+)?).*?\)?$/i;
  }

  static get name() {
    return 'image';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('image')})(.*)$`);
  }

  static buildPrefix() {
    return wrap('image');
  }

  static matchMarkdown(markdown) {
    let mdMatch = markdown.match(this.markdownPattern);

    if (!mdMatch) {
      return null;
    }

    markdown = mdMatch[1];

    const nativeString = this.buildPrefix(markdown) + markdown;
    return this.match(nativeString);
  }
}
