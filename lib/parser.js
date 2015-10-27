import Checklist      from './types/checklist';
import Code           from './types/code';
import Heading        from './types/heading';
import HorizontalRule from './types/horizontal-rule';
import Image          from './types/image';
import LinkDefinition from './types/link-definition';
import OrderedList    from './types/ordered-list';
import Paragraph      from './types/paragraph';
import Title          from './types/title';
import UnorderedList  from './types/unordered-list';

const PARSE_ORDER = [
  Checklist,
  Code,
  Title,
  Heading,
  HorizontalRule,
  Image,
  LinkDefinition,
  OrderedList,
  UnorderedList,
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
