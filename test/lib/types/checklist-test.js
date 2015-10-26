import Checklist from '../../../lib/types/checklist';
import { expect }    from 'chai';
import { wrap   }    from '../../../lib/brackets';

describe('Checklist', () => {
  describe('.match', () => {
    let line, source;

    beforeEach(() => {
      source = `${wrap('checklist-1')}+ [x] Foo`;
      line   = Checklist.match(source);
    });

    it('matches a native UL line', () => {
      expect(line).to.be.an.instanceof(Checklist);
    });

    it('determines its level', () => {
      expect(line.level).to.eql(1);
    });

    it('determines its marker', () => {
      expect(line.marker).to.eql('+');
    });

    it('determines whether it is checked', () => {
      expect(line.isChecked).to.eql(true);
      const unchecked = source.replace('x', ' ');
      expect(Checklist.match(unchecked).isChecked).to.be.false;
    });
  });
});

