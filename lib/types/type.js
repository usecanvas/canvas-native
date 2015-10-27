export default class Type {
  constructor(match) {
    this.match = match;
  }

  get groupType() {
    return 'canvas';
  }

  get isNesting() {
    return typeof this.level === 'number' && this.groupType !== 'canvas';
  }

  get type() {
    return this.constructor.name;
  }

  toJSON() {
    throw new Error('Must implement `toJSON` for each type');
  }

  toMarkdown(/* prev, next */) {
    throw new Error('Must implement `toMarkdown` for each type');
  }

  static get name() {
    throw new Error('Must implement `name` for each type');
  }

  static get pattern() {
    throw new Error('Must implement `pattern` for each type');
  }

  static match(text) {
    const match = text.match(this.pattern);

    if (match) {
      return new this(match);
    }

    return null;
  }
}
