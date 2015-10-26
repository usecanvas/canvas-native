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
});
