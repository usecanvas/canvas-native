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
});

