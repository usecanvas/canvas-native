import parse      from '../../../lib/parsers/native';
import { expect } from 'chai';

describe('parsers/native', () => {
  it('parses native text into line objects', () => {
    expect(parse('Foo\nBar')
      .map(line => line.constructor.name))
      .to.eql(['paragraph', 'paragraph']);
  });
});
