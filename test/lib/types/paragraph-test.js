import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';

describe('Paragraph', () => {
  describe('.match', () => {
    it('matches a normal text line', () => {
      expect(Paragraph.match('Paragraph')).to.be.an.instanceof(Paragraph);
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Paragraph.match('Foo');
    });

    it('returns its source with a new line', () => {
      expect(line.toMarkdown(null, Paragraph.match('Bar')))
        .to.eql('Foo\n');
    });

    it('does not return a new line with no next line', () => {
      expect(line.toMarkdown())
        .to.eql('Foo');
    });
  });
});
