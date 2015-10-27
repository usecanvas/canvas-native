import Type from './type';

export default class HorizontalRule extends Type {
  static get name() {
    return 'horizontal-rule';
  }

  static get pattern() {
    return /^((?:- ?){3,})$/;
  }
}
