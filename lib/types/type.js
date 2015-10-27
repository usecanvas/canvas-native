export default class Type {
  constructor(match) {
    this.match = match;
  }

  toMarkdown(/* prev, next */) {
    throw new Error('Must implement `markdown` for each type');
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
