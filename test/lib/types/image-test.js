import Image      from '../../../lib/types/image';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Image', () => {
  describe('.match', () => {
    it('matches an image', () => {
      const source = makeNativeLine('https://example.com/foo.png');
      expect(Image.match(source)).to.be.an.instanceof(Image);
    });
  });

  describe('.matchMarkdown', () => {
    let url = 'https://example.com/foo.png?foo=bar';

    it('matches an image', () => {
      expect(Image.matchMarkdown(url))
        .to.be.an.instanceof(Image);
    });

    it('matches an image with alt text and a title', () => {
      const line =
        Image.matchMarkdown(`![Alt text](${url} "title")`);
      expect(line)
        .to.be.an.instanceof(Image);
      expect(line.source).to.eql(makeNativeLine(url));
    });

    it('matches an image no alt text and a title', () => {
      const line =
        Image.matchMarkdown(`![](${url} "title")`);
      expect(line)
        .to.be.an.instanceof(Image);
      expect(line.source).to.eql(makeNativeLine(url));
    });

    it('matches an image alt text and no title', () => {
      const line =
        Image.matchMarkdown(`![](${url})`);
      expect(line)
        .to.be.an.instanceof(Image);
      expect(line.source).to.eql(makeNativeLine(url));
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = Image.match(makeNativeLine('https://example.com/test.png'));
      expect(line.toJSON()).to.eql({
        type   : 'image',
        meta   : {},
        content: 'https://example.com/test.png',
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Image.match(makeNativeLine('https://example.com/test.png'));
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

function makeNativeLine(url) {
  const json = JSON.stringify({ url: url });
  return wrap(`image-${json}`);
}
