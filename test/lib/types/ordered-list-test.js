import OrderedList from '../../../lib/types/ordered-list';
import Paragraph   from '../../../lib/types/paragraph';
import { expect }  from 'chai';
import { wrap   }  from '../../../lib/brackets';

describe('OrderedList', () => {
  describe('.match', () => {
    let line;

    beforeEach(() => {
      const source = `${wrap('ordered-list-1')}2. Foo`;
      line = OrderedList.match(source);
    });

    it('matches a native OL line', () => {
      expect(line).to.be.an.instanceof(OrderedList);
    });

    it('determines its level', () => {
      expect(line.level).to.eql(1);
    });

    it('determines its number', () => {
      expect(line.number).to.eql(2);
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = OrderedList.match(wrap('ordered-list-0') + '1. Foo');
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
