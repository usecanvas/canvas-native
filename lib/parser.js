import Paragraph from './types/paragraph';

const PARSE_ORDER = [
  Paragraph,
];

export function parse(text) {
  const sources  = text.split('\n');
  const result = [];

  for (const source of sources) {
    let line;

    for (const klass of PARSE_ORDER) {
      if ((line = klass.match(source))) {
        break;
      }
    }

    if (!line) {
      throw new Error(`No matching type for source "${source}"`);
    }

    result.push(line);
  }

  return result;
}
