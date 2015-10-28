import parse       from '../../../lib/parsers/markdown';
import { expect  } from 'chai';
import { trim    } from '../../helpers';
import { wrap    } from '../../../lib/brackets';

xdescribe('parsers/markdown', () => {
  it('parses markdown documents into native Canvas', () => {
    const markdown = trim(`\
      # Title

      - Foo
      - Bar
        - Baz
      1. Qux

      Paragraph.`);

    expect(parse(markdown)).to.eql([
      `${wrap('doc-heading')}Title`,
    ].join('\n'));
  });
});
