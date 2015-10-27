import Image      from '../../../lib/types/image';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Image', () => {
  describe('.match', () => {
    it('matches an image', () => {
      const source = `${wrap('image')}https://example.com/foo.png`;
      expect(Image.match(source)).to.be.an.instanceof(Image);
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Image.match(`${wrap('image')}https://example.com/test.png`);
    });

    it('appends a new line mid-document', () => {
      expect(line.toMarkdown(line, line))
        .to.eql('https://example.com/test.png\n');
    });

    it('does not append a new line at end of document', () => {
      expect(line.toMarkdown(line, null))
        .to.eql('https://example.com/test.png');
    });
  });
});
