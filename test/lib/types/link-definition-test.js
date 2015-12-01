import LinkDefinition from '../../../lib/types/link-definition';
import { expect }     from 'chai';

describe('LinkDefinition', () => {
  ['matchNative', 'matchMarkdown'].forEach(matchType => {
    describe(`.${matchType}`, () => {
      let source;

      beforeEach(() => {
        source = '[foo]: http://www.example.com';
      });

      it('matches a link definition', () => {
        expect(LinkDefinition[matchType](source)).to.be.an.instanceof(LinkDefinition);
      });

      it('determines its label', () => {
        expect(LinkDefinition[matchType](source).label).to.eql('foo');
      });

      it('determines its URL', () => {
        expect(LinkDefinition[matchType](source).url).to.eql('http://www.example.com');
      });
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = LinkDefinition.match('[foo]: bar');
      expect(line.toJSON()).to.eql({
        type   : 'link-definition',
        content: 'bar',
        meta   : {
          label: 'foo',
          url  : 'bar',
        }
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = LinkDefinition.match('[foo]: bar');
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(line, line))
        .to.eql('[foo]: bar\n');
    });

    it('does not append a new line at end of document', () => {
      expect(line.toMarkdown(line, null))
        .to.eql('[foo]: bar');
    });
  });
});
