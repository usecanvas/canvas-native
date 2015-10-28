import format      from '../../../lib/formatters/json';
import parse       from '../../../lib/parsers/native';
import { expect  } from 'chai';
import { wrap    } from '../../../lib/brackets';

describe('formatters/json', () => {
  it('includes a title', () => {
    const doc = parse([
      wrap('doc-heading') + 'Foo'
    ].join('\n'));

    expect(format(doc).meta).to.eql({
      title: 'Foo'
    });
  });

  it('formats simple paragraphs as JSON', () => {
    const doc = parse([
      'Foo',
      'Bar',
      'Baz',
    ].join('\n'));

    expect(format(doc).content).to.eql([
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

    expect(format(doc).content).to.eql([
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
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

  it('does not nest under headers', () => {
    const doc = parse([
      '# Header',
      `${wrap('unordered-list-1')}- UL-1-0`,
    ].join('\n'));

    expect(format(doc).content).to.eql([
      {
        type   : 'heading',
        meta   : { level: 1 },
        content: '# Header',
      },
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type: 'unordered-list',
            meta: { level: 1 },
            content: [
              {
                type   : 'unordered-list-item',
                meta   : { level: 1 },
                content: '- UL-1-0'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('does not create consecutive equally-nested lists', () => {
    const doc = parse([
      `${wrap('unordered-list-0')}- UL-0-0`,
      `${wrap('unordered-list-1')}- UL-1-0`,
      `${wrap('unordered-list-0')}- UL-0-1`,
      `${wrap('unordered-list-1')}- UL-1-0`,
      `${wrap('unordered-list-0')}- UL-0-2`,
    ].join('\n'));

    expect(format(doc).content).to.eql([
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: '- UL-0-0',
          },
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                  type   : 'unordered-list-item',
                  meta   : { level: 1 },
                  content: '- UL-1-0'
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: '- UL-0-1',
          },
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                  type   : 'unordered-list-item',
                  meta   : { level: 1 },
                  content: '- UL-1-0'
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: '- UL-0-2',
          },
        ]
      }
    ]);
  });

  it('handles nested lists', () => {
    const doc = parse([
      `${wrap('unordered-list-1')}- UL-1-0`,
      `${wrap('unordered-list-2')}- UL-2-0`,
      `${wrap('unordered-list-2')}- UL-2-1`,
      `${wrap('unordered-list-3')}- UL-3-0`,
      `${wrap('unordered-list-2')}- UL-2-2`,
      `${wrap('unordered-list-0')}- UL-0-0`,
      `${wrap('ordered-list-2')}1. OL-2-0`,
      `${wrap('ordered-list-1')}1. OL-1-0`,
      `${wrap('unordered-list-0')}- UL-0-0`,
      'Paragraph'
    ].join('\n'));

    expect(format(doc).content).to.eql([
      {
        type   : 'unordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'unordered-list',
            meta   : { level: 1 },
            content: [
              {
                type   : 'unordered-list-item',
                meta   : { level: 1 },
                content: '- UL-1-0'
              },
              {
                type   : 'unordered-list',
                meta   : { level: 2 },
                content: [
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: '- UL-2-0'
                  },
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: '- UL-2-1'
                  },
                  {
                    type   : 'unordered-list',
                    meta   : { level: 3 },
                    content: [
                      {
                        type   : 'unordered-list-item',
                        meta   : { level: 3 },
                        content: '- UL-3-0'
                      },
                    ]
                  },
                  {
                    type   : 'unordered-list-item',
                    meta   : { level: 2 },
                    content: '- UL-2-2'
                  },
                ]
              }
            ]
          },
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: '- UL-0-0'
          }
        ]
      },
      {
        type   : 'ordered-list',
        meta   : { level: 0 },
        content: [
          {
            type   : 'ordered-list',
            meta   : { level: 1 },
            content: [
              {
                type   : 'ordered-list',
                meta   : { level: 2 },
                content: [
                  {
                    type   : 'ordered-list-item',
                    meta   : { level: 2 },
                    content: '1. OL-2-0',
                  },
                ]
              },
              {
                type   : 'ordered-list-item',
                meta   : { level: 1 },
                content: '1. OL-1-0',
              },
            ]
          }
        ]
      },
      {
        type: 'unordered-list',
        meta: { level: 0 },
        content: [
          {
            type   : 'unordered-list-item',
            meta   : { level: 0 },
            content: '- UL-0-0',
          }
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

    expect(format(doc).content).to.eql([
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
