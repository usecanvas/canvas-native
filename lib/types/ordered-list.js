import List     from './list';
import { wrap } from '../brackets';

const MARKDOWN_MATCH = ' *((\\d+)\\. (.*))';

export default class OrderedList extends List {
  get content() {
    return this.match[5];
  }

  get number() {
    return parseInt(this.match[4], 10);
  }

  static get markdownPattern() {
    return new RegExp(`^${MARKDOWN_MATCH}$`);
  }

  static get name() {
    return 'ordered-list-item';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap(this.prefixBase + '-(\\d+)')})${MARKDOWN_MATCH}$`);
  }

  static get prefixBase() {
    return 'ordered-list';
  }
}
