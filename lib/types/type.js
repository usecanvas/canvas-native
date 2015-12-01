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

  get isSummarized() {
    return true;
  }

  get source() {
    return this.match[0];
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

  static get markdownPattern() {
    throw new Error('Must implement `markdownPattern` for each type');
  }

  static get nativePattern() {
    throw new Error('Must implement `nativePattern` for each type');
  }

  static buildPrefix() {
    return '';
  }

  static match(native) {
    const match = native.match(this.nativePattern);

    if (match) {
      return new this(match);
    }

    return null;
  }

  static matchMarkdown(markdown) {
    let mdMatch = markdown.match(this.markdownPattern);

    if (!mdMatch) {
      return null;
    }

    const nativeString = this.buildPrefix(markdown) + markdown;
    return this.match(nativeString);
  }

  static matchNative() {
    return this.match(...arguments);
  }
}
