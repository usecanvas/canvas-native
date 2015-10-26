import List     from './list';
import { wrap } from '../brackets';

export default class OrderedList extends List {
  get number() {
    return parseInt(this.match[4], 10);
  }

  static get name() {
    return 'ordered-list-item';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('ordered-list-(\\d+)')})((\\d+)\\. (.*))$`);
  }
}
