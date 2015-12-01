import format     from '../../../lib/formatters/html';
import parse      from '../../../lib/parsers/native';
import { expect } from 'chai';
import { trim   } from '../../helpers';
import { wrap   } from '../../../lib/brackets';

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

  it('skips comments', () => {
    const doc = parse([
      'Foo',
      'Bar',
      `${wrap('comment-theuser')}// Foo`,
      'Baz',
    ].join('\n'));

    expect(format(doc)).to.eql(trim(`\
      <p>Foo</p>
      <p>Bar</p>
      <p>Baz</p>\n`));
  });
});
