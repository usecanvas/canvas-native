import { parse  } from '../../lib/parser';
import { expect } from 'chai';

describe('Parser', () => {
  describe('.parse', () => {
    it('parses native text into line objects', () => {
      expect(parse('Foo\nBar')
        .map(line => line.constructor.name))
        .to.eql(['paragraph', 'paragraph']);
    });
  });
});
