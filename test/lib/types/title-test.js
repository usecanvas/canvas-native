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

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Title.match(`${wrap('doc-heading')}Foo`);
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(line, line)).to.eql('# Foo\n');
    });

    it('does not append a new line at end of document', () => {
      expect(line.toMarkdown(line, null)).to.eql('# Foo');
    });
  });
});
