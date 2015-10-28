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

  describe('.matchMarkdown', () => {
    const source = '# Title';

    it('matches an H1 line', () => {
      expect(Title.matchMarkdown(source)).to.be.an.instanceof(Title);
    });

    it('ignores titles when one exists', () => {
      expect(Title.matchMarkdown(source, { hasTitle: true })).to.be.null;
    });

    it('stripes the hash', () => {
      expect(Title.matchMarkdown(source).source)
        .to.eql(`${wrap('doc-heading')}Title`);
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = Title.match(`${wrap('doc-heading')}Foo`);
      expect(line.toJSON()).to.eql({
        type   : 'title',
        content: 'Foo',
      });
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
