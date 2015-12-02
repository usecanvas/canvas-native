import Type     from './type';
import { wrap } from '../brackets';

export default class Image extends Type {
  get content() {
    return this.meta.url;
  }

  get meta() {
    return JSON.parse(this.match[2]);
  }

  toJSON() {
    const meta     = {};
    const thisMeta = this.meta;

    for (const key in thisMeta) {
      if (!thisMeta.hasOwnProperty(key)) {
        continue;
      }

      if (key === 'url') {
        continue;
      }

      meta[key] = thisMeta[key];
    }

    return {
      type   : this.type,
      content: this.content,
      meta   : meta
    }
  }

  toMarkdown(prev, next) {
    if (!next) {
      return this.content;
    }

    return this.content + '\n';
  }

  static get markdownPattern() {
    return /^(?:!\[.*?\]\()?(https?:\/\/.+\/.+\.(?:gif|jpg|jpeg|png)(?:\?[^\s)]+)?).*?\)?$/i;
  }

  static get name() {
    return 'image';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('image-(.*)')})$`);
  }

  static buildPrefix(url) {
    return wrap(`image-${JSON.stringify({ url: url })}`);
  }

  static matchMarkdown(markdown) {
    let mdMatch = markdown.match(this.markdownPattern);

    if (!mdMatch) {
      return null;
    }

    markdown = mdMatch[1];

    const nativeString = this.buildPrefix(markdown);
    return this.match(nativeString);
  }
}
