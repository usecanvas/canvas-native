import Code       from '../../../lib/types/code';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Code', () => {
  describe('.match', () => {
    it('matches a normal text line', () => {
      const source = `${wrap('code')}Code`;
      expect(Code.match(source)).to.be.an.instanceof(Code);
    });
  });
});
