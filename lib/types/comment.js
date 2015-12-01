import Type     from './type';
import { wrap } from '../brackets';

export default class Comment extends Type {
  get content() {
    return this.match[4];
  }

  get groupType() {
    return 'comment';
  }

  get isSummarized() {
    return false;
  }

  get toMarkdown() {
    return null;
  }

  get username() {
    return this.match[2];
  }

  toJSON() {
    return {
      content: this.content,
      type   : this.type,
      meta   : {
        username: this.username,
      }
    }
  }

  static get name() {
    return 'comment-item';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('comment-(\\w+)')})(// (.*))$`);
  }

  static get matchMarkdown() {
    return null;
  }
}
