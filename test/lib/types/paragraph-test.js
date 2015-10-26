import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';

describe('Paragraph', () => {
  describe('.match', () => {
    it('matches a normal text line', () => {
      expect(Paragraph.match('Paragraph')).to.be.an.instanceof(Paragraph);
    });
  });
});
