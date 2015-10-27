import HorizontalRule from '../../../lib/types/horizontal-rule';
import { expect }     from 'chai';

describe('HorizontalRule', () => {
  describe('.match', () => {
    it('matches a horizontal rule', () => {
      expect(HorizontalRule.match('---'))
        .to.be.an.instanceof(HorizontalRule);
      expect(HorizontalRule.match('- - -'))
        .to.be.an.instanceof(HorizontalRule);
    });
  });
});
