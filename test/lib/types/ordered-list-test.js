import OrderedList from '../../../lib/types/ordered-list';
import Paragraph   from '../../../lib/types/paragraph';
import { expect }  from 'chai';
import { wrap   }  from '../../../lib/brackets';

describe('OrderedList', () => {
  [
    ['matchNative'  , `${wrap('ordered-list-1')}2. Foo`],
    ['matchMarkdown', '  2. Foo']
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = OrderedList[matchType](matchSource);
      });

      it('matches an ordered list line', () => {
        expect(line).to.be.an.instanceof(OrderedList);
      });

      it('determines its level', () => {
        expect(line.level).to.eql(1);
      });

      it('determines its number', () => {
        expect(line.number).to.eql(2);
      });

      it('removes leading space', () => {
        expect(line.source).to.eql(wrap('ordered-list-1') + '2. Foo');
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = OrderedList.match(wrap('ordered-list-0') + '1. Foo');
    });

    it('reflects its nesting', () => {
      line = OrderedList.match(wrap('ordered-list-1') + '1. Foo');

      expect(line.toMarkdown(null, null))
        .to.eql('  1. Foo');
    });

    it('appends a new line at the end of a list', () => {
      expect(line.toMarkdown(null, Paragraph.match('Foo')))
        .to.eql('1. Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('1. Foo');
    });

    it('does not append a new line mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('1. Foo');
    });
  });
});
