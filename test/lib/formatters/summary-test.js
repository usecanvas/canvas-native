import format     from '../../../lib/formatters/summary';
import parse      from '../../../lib/parsers/markdown';
import { expect } from 'chai';

describe('formatters/summary', () => {
  it('formats documents as a plaintext summary', () => {
    const doc = parse([
      '# Title',
      'Foo. ',
      'Bar...',
      '   ',
      '- Baz *qux* [asdf](http://www.example.com)',
      'Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz ',
      'Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz ',
      'Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz ',
      '- Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz ',
      '- Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz ',
    ].join('\n'));

    expect(format(doc)).to.eql('Foo. Bar... Baz qux asdf. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz Foobarbaz. Foobarbaz Foobarbaz Foobarbaz Foobarbaz.');
  });

  ['!', '?'].forEach(punct => {
    it(`does not add a period after existing "${punct}" punctuation`, () => {
      const doc = parse(`Foo${punct}\nBar`);
      expect(format(doc)).to.eq(`Foo${punct} Bar.`);
    });
  });
});
