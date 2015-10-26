export default class Type {
  constructor(match) {
    this.match = match;
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
