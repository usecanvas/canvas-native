import UnorderedList from './unordered-list';
import { wrap }      from '../brackets';

export default class Checklist extends UnorderedList {
  get isChecked() {
    return /x/i.test(this.match[5]);
  }

  toJSON() {
    const json = super.toJSON();
    json.meta.checked = this.isChecked;
    return json;
  }

  static get name() {
    return 'checklist-item';
  }

  static get pattern() {
    return new RegExp(`^(${wrap('checklist-(\\d+)')})(([\\-\\+\\*]) \\[([x ])\\] (.*))$`, 'i');
  }
}
