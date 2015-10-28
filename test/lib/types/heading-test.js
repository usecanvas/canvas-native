import Heading    from '../../../lib/types/heading';
import { expect } from 'chai';

describe('Heading', () => {
  ['matchNative', 'matchMarkdown'].forEach(matchType => {
    describe(`.${matchType}`, () => {
      it('matches a normal heading line', () => {
        const source = `# Heading`;
        expect(Heading[matchType](source)).to.be.an.instanceof(Heading);
      });

      it('determines its level', () => {
        const source = `## Heading`;
        expect(Heading[matchType](source).level).to.eql(2);
      });
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON with its level', () => {
      const line = Heading.match('#### Foo');
      expect(line.toJSON()).to.eql({
        type   : 'heading',
        content: '#### Foo',
        meta   : {
          level: 4
        }
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Heading.match('# Foo');
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(line, line)).to.eql('# Foo\n');
    });

    it('does not append a new line at end of document', () => {
      expect(line.toMarkdown(line, null)).to.eql('# Foo');
    });
  });
});

