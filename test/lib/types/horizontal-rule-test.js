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

  describe('.matchMarkdown', () => {
    it('matches a horizontal rule', () => {
      expect(HorizontalRule.matchMarkdown('---'))
        .to.be.an.instanceof(HorizontalRule);
      expect(HorizontalRule.matchMarkdown('- - -'))
        .to.be.an.instanceof(HorizontalRule);
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = HorizontalRule.match('- - -');
      expect(line.toJSON()).to.eql({
        type   : 'horizontal-rule',
        content: '- - -',
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = HorizontalRule.match('- - -');
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(line, line)).to.eql('- - -\n');
    });

    it('does not append a new line at end of document', () => {
      expect(line.toMarkdown(line, null)).to.eql('- - -');
    });
  });
});
