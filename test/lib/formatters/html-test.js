import format      from '../../../lib/formatters/html';
import { expect  } from 'chai';
import { parse   } from '../../../lib/parser';
import { trim    } from '../../helpers';

describe('formatters/html', () => {
  it('formats documents as HTML', () => {
    const doc = parse([
      'Foo',
      'Bar',
      'Baz',
    ].join('\n'));

    expect(format(doc)).to.eql(trim(`\
      <p>Foo</p>
      <p>Bar</p>
      <p>Baz</p>\n`));
  });
});
