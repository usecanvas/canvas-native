import Scanner    from '../../lib/scanner';
import { expect } from 'chai';

describe('Scanner', () => {
  it('iterates over lines in sets of 3', () => {
    const scanner = new Scanner([{
      source: 'Foo',
      type  : 'paragraph',
    }, {
      source: 'Bar',
      type  : 'paragraph',
    }, {
      source: 'Baz',
      type  : 'paragraph',
    }]);

    for (const [prev, current, next] of scanner) {
      if (prev === null) {
        expect(prev).to.be.null;
        expect(current.source).to.eql('Foo');
        expect(next.source).to.eql('Bar');
      } else if (next === null) {
        expect(prev.source).to.eql('Bar');
        expect(current.source).to.eql('Baz');
        expect(next).to.be.null;
      } else {
        expect(prev.source).to.eql('Foo');
        expect(current.source).to.eql('Bar');
        expect(next.source).to.eql('Baz');
      }
    }
  });
});
