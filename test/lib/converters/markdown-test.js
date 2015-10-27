import { convert } from '../../../lib/converters/markdown';
import { expect  } from 'chai';
import { parse   } from '../../../lib/parser';
import { trim    } from '../../helpers';
import { wrap    } from '../../../lib/brackets';

describe('converters/markdown', () => {
  it('converts simple paragraphs to markdown', () => {
    const doc = parse([
      'Foo',
      'Bar',
      'Baz',
    ].join('\n'));

    expect(convert(doc)).to.eql(trim(`\
      Foo

      Bar

      Baz`));
  });
});
