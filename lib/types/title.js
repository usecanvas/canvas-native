import Type     from './type';
import { wrap } from '../brackets';

export default class Title extends Type {
  static get name() {
    return 'title';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('doc-heading')})(.*)$`);
  }
}
