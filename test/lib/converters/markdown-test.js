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

  it('groups unordered lists', () => {
    const doc = parse([
      `${wrap('unordered-list-0')}- Foo`,
      `${wrap('unordered-list-0')}- Bar`,
      `${wrap('unordered-list-0')}- Baz`,
      'Paragraph'
    ].join('\n'));

    expect(convert(doc)).to.eql(trim(`\
      - Foo
      - Bar
      - Baz

      Paragraph`));
  });

  it('groups ordered lists', () => {
    const doc = parse([
      `${wrap('ordered-list-0')}1. Foo`,
      `${wrap('ordered-list-0')}2. Bar`,
      `${wrap('ordered-list-0')}3. Baz`,
      'Paragraph'
    ].join('\n'));

    expect(convert(doc)).to.eql(trim(`\
      1. Foo
      2. Bar
      3. Baz

      Paragraph`));
  });

  it('groups checklists', () => {
    const doc = parse([
      `${wrap('checklist-0')}- [ ] Foo`,
      `${wrap('checklist-0')}- [x] Bar`,
      `${wrap('checklist-0')}- [ ] Baz`,
      'Paragraph'
    ].join('\n'));

    expect(convert(doc)).to.eql(trim(`\
      - [ ] Foo
      - [x] Bar
      - [ ] Baz

      Paragraph`));
  });
});
