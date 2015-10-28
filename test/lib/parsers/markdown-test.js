import parse       from '../../../lib/parsers/markdown';
import { expect  } from 'chai';
import { trim    } from '../../helpers';
import { wrap    } from '../../../lib/brackets';

describe('parsers/markdown', () => {
  it('parses markdown documents into native Canvas', () => {
    const markdown = trim(`\
      # Title

      # Heading



      - Foo
      - Bar
        - Baz
      1. Qux

      \`\`\`
      class Foo
        def bar


        end
      end
      \`\`\`

      Paragraph`);

    const parsed = parse(markdown);

    expect(parsed.map(n => n.source)).to.eql([
      `${wrap('doc-heading')}Title`,
      '# Heading',
      '',
      `${wrap('unordered-list-0')}- Foo`,
      `${wrap('unordered-list-0')}- Bar`,
      `${wrap('unordered-list-1')}- Baz`,
      `${wrap('ordered-list-0')}1. Qux`,
      `${wrap('code')}class Foo`,
      `${wrap('code')}  def bar`,
      `${wrap('code')}`,
      `${wrap('code')}`,
      `${wrap('code')}  end`,
      `${wrap('code')}end`,
      'Paragraph',
    ]);
  });

  it('only allows the first line to be a title', () => {
    const markdown = '\n# Foo';
    expect(parse(markdown).map(n => n.source)).to.eql([
      '',
      '# Foo'
    ]);
  });
});
