import OrderedList from '../../../lib/types/ordered-list';
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
});
