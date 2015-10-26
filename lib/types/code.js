import Type     from './type';
import { wrap } from '../brackets';

export default class Code extends Type {
  static get name() {
    return 'code';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('code')})(.*)$`);
  }
}
