import { convert } from '../../../lib/converters/json';
import { expect  } from 'chai';
import { parse   } from '../../../lib/parser';
import { wrap    } from '../../../lib/brackets';

describe('converters/json', () => {
  it('converts simple paragraphs to JSON', () => {
    const doc = parse([
      'Foo',
      'Bar',
      'Baz',
    ].join('\n'));

    expect(convert(doc).content).to.eql([
      {
        type   : 'paragraph',
        content: 'Foo',
      },
      {
        type   : 'paragraph',
        content: 'Bar',
      },
      {
        type   : 'paragraph',
        content: 'Baz',
      },
    ]);
  });

  it('groups lists', () => {
    const doc = parse([
      `${wrap('unordered-list-0')}- Foo`,
      `${wrap('unordered-list-0')}- Bar`,
      `${wrap('unordered-list-0')}- Baz`,
      'Paragraph'
    ].join('\n'));

    expect(convert(doc).content).to.eql([
      {
        type   : 'unordered-list',
        content: [
          {
            type   : 'unordered-list-item',
            content: '- Foo',
            meta   : { level: 0 },
          },
          {
            type   : 'unordered-list-item',
            content: '- Bar',
            meta   : { level: 0 },
          },
          {
            type   : 'unordered-list-item',
            content: '- Baz',
            meta   : { level: 0 },
          },
        ]
      },
      {
        type   : 'paragraph',
        content: 'Paragraph',
      },
    ]);
  });

  it('wraps code blocks', () => {
    const doc = parse([
      `${wrap('code')}defmodule Foo`,
      `${wrap('code')}end`,
      'Paragraph',
    ].join('\n'));

    expect(convert(doc).content).to.eql([
      {
        type   : 'code-block',
        content: [
          {
            type   : 'code',
            content: 'defmodule Foo',
          },
          {
            type   : 'code',
            content: 'end',
          },
        ]
      },
      {
        type   : 'paragraph',
        content: 'Paragraph',
      },
    ]);
  });
});
