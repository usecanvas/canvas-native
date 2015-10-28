import Paragraph     from '../../../lib/types/paragraph';
import UnorderedList from '../../../lib/types/unordered-list';
import { expect }    from 'chai';
import { wrap   }    from '../../../lib/brackets';

describe('UnorderedList', () => {
  [
    ['matchNative'  , `${wrap('unordered-list-1')}+ Foo`],
    ['matchMarkdown', '  + Foo']
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = UnorderedList[matchType](matchSource);
      });

      it('matches an unordered list line', () => {
        expect(line).to.be.an.instanceof(UnorderedList);
      });

      it('determines its level', () => {
        expect(line.level).to.eql(1);
      });

      it('determines its marker', () => {
        expect(line.marker).to.eql('+');
      });

      it('removes leading space', () => {
        expect(line.source).to.eql(wrap('unordered-list-1') + '+ Foo');
      });
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
