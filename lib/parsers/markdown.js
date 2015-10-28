import PARSE_ORDER from './parse-order';

export default function parse(markdown) {
  const sources = markdown.split('\n');
  let result    = [];

  const context = { groupType: null, hasTitle: false };

  let didNewLine = false;

  for (const source of sources) {
    let line;

    if (source === '' && context.groupType !== 'code' && didNewLine) {
      didNewLine = false;
      continue;
    } else {
      didNewLine = true;
    }

    if (/^```.*/.test(source)) {
      if (context.groupType === 'code') {
        context.groupType = null;
      } else {
        context.groupType = 'code';
      }

      continue;
    }

    for (const klass of PARSE_ORDER) {
      if ((line = klass.matchMarkdown(source, context))) {
        break;
      }
    }

    if (!line) {
      throw new Error(`No matching type for source "${source}"`);
    }

    if (line.type === 'title') {
      context.hasTitle = true;
    }

    result.push(line);
  }

  return result;
}
