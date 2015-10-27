import Type     from './type';
import { wrap } from '../brackets';

export default class Image extends Type {
  static get name() {
    return 'image';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('image')})(.*)$`);
  }
}
