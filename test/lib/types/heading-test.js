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

