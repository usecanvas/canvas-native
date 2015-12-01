import UnorderedList from './unordered-list';
import { wrap }      from '../brackets';

const MARKDOWN_MATCH = ' *(([\\-\\+\\*]) \\[([x ])\\] (.*))';

export default class Checklist extends UnorderedList {
  get content() {
    return this.match[6];
  }

  get isChecked() {
    return /x/i.test(this.match[5]);
  }

  toJSON() {
    const json = super.toJSON();
    json.meta.checked = this.isChecked;
    return json;
  }

  static get markdownPattern() {
    return new RegExp(`^${MARKDOWN_MATCH}$`, 'i');
  }

  static get name() {
    return 'checklist-item';
  }

  static get nativePattern() {
    return new RegExp(`^(${wrap(this.prefixBase + '-(\\d+)')})${MARKDOWN_MATCH}$`, 'i');
  }

  static get prefixBase() {
    return 'checklist';
  }
}
