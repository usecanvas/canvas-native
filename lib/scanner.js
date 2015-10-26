export default class Scanner {
  constructor(lines) {
    this.lines = lines;
  }

  [Symbol.iterator]() {
    let idx    = 0;
    const self = this;

    return {
      next() {
        const current = self.lines[idx];

        if (!current) {
          return { done: true };
        }

        const prev = self.lines[idx - 1] || null;
        const next = self.lines[idx + 1] || null;

        idx += 1;

        return { value: [prev, current, next], done: false };
      }
    };
  }
}
