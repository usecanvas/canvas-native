import List     from './list';
import { wrap } from '../brackets';

const MARKDOWN_MATCH = ' *(([\\*\\-\\+]) (.*))';

export default class UnorderedList extends List {
  get marker() {
    return this.match[4];
  }

  static get markdownPattern() {
    return new RegExp(`^${MARKDOWN_MATCH}$`);
  }

  static get name() {
    return 'unordered-list-item';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap('unordered-list-(\\d+)')})${MARKDOWN_MATCH}$`);
  }

  static get prefixBase() {
    return 'unordered-list';
  }
}

