import Title      from '../../../lib/types/title';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Title', () => {
  describe('.match', () => {
    it('matches a normal text line', () => {
      const source = `${wrap('doc-heading')}Title`;
      expect(Title.match(source)).to.be.an.instanceof(Title);
    });
  });
});
