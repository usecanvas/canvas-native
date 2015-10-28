import PARSE_ORDER from './parse-order';

export default function parse(native) {
  const sources  = native.split('\n');
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
