import { convert } from '../../../lib/converters/html';
import { expect  } from 'chai';
import { parse   } from '../../../lib/parser';
import { trim    } from '../../helpers';

describe('converters/html', () => {
  it('converts documents to HTML', () => {
    const doc = parse([
      'Foo',
      'Bar',
      'Baz',
    ].join('\n'));

    expect(convert(doc)).to.eql(trim(`\
      <p>Foo</p>
      <p>Bar</p>
      <p>Baz</p>\n`));
  });
});
