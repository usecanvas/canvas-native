import Blockquote from '../../../lib/types/blockquote';
import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Blockquote', () => {
  [
    ['matchNative', `${wrap('blockquote')}> Foo`],
    ['matchMarkdown', '> Foo']
  ].forEach(([matchType, matchSource]) => {
    describe(`.${matchType}`, () => {
      let line;

      beforeEach(() => {
        line = Blockquote[matchType](matchSource);
      });

      it('matches a blockquote line', () => {
        expect(line).to.be.an.instanceof(Blockquote);
      });

      it('determines its marker', () => {
        expect(line.marker).to.eql('>');
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Blockquote.match(wrap('blockquote') + '> Foo');
    });

    it('appends a new line at the end of a group', () => {
      expect(line.toMarkdown(null, Paragraph.match('Foo')))
        .to.eql('> Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('> Foo');
    });

    it('appends a newline mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('> Foo\n');
    });
  });

  describe('#toJSON', () => {
    it('returns its type and source', () => {
      const line = Blockquote.matchMarkdown('> Foo');
      expect(line.toJSON()).to.eql({
        content: '> Foo',
        type   : 'blockquote-item',
      });
    });
  });
});
