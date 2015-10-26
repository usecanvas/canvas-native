import List     from './list';
import { wrap } from '../brackets';

export default class UnorderdList extends List {
  get marker() {
    return this.match[4];
  }

  static get name() {
    return 'unordered-list-item';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('unordered-list-(\\d+)')})(([\\*\\-\\+]) (.*))$`);
  }
}

