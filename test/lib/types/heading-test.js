import Heading    from '../../../lib/types/heading';
import { expect } from 'chai';

describe('Heading', () => {
  describe('.match', () => {
    it('matches a normal heading line', () => {
      const source = `# Heading`;
      expect(Heading.match(source)).to.be.an.instanceof(Heading);
    });

    it('determines its level', () => {
      const source = `## Heading`;
      expect(Heading.match(source).level).to.eql(2);
    });
  });

  describe('.matchMarkdown', () => {
    it('matches a normal heading line', () => {
      const source = `# Heading`;
      expect(Heading.matchMarkdown(source)).to.be.an.instanceof(Heading);
    });

    it('determines its level', () => {
      const source = `## Heading`;
      expect(Heading.matchMarkdown(source).level).to.eql(2);
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

