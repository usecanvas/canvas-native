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
});
