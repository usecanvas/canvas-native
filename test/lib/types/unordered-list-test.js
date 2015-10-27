import Paragraph     from '../../../lib/types/paragraph';
import UnorderedList from '../../../lib/types/unordered-list';
import { expect }    from 'chai';
import { wrap   }    from '../../../lib/brackets';

describe('UnorderedList', () => {
  describe('.match', () => {
    let line;

    beforeEach(() => {
      const source = `${wrap('unordered-list-1')}+ Foo`;
      line = UnorderedList.match(source);
    });

    it('matches a native UL line', () => {
      expect(line).to.be.an.instanceof(UnorderedList);
    });

    it('determines its level', () => {
      expect(line.level).to.eql(1);
    });

    it('determines its marker', () => {
      expect(line.marker).to.eql('+');
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = UnorderedList.match(wrap('unordered-list-0') + '- Foo');
    });

    it('reflects its nesting', () => {
      line = UnorderedList.match(wrap('unordered-list-1') + '* Foo');

      expect(line.toMarkdown(null, null))
        .to.eql('  * Foo');
    });


    it('appends a new line at the end of a list', () => {
      expect(line.toMarkdown(null, Paragraph.match('Foo')))
        .to.eql('- Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('- Foo');
    });

    it('does not append a new line mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('- Foo');
    });
  });
});
