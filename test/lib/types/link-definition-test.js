import LinkDefinition from '../../../lib/types/link-definition';
import { expect }     from 'chai';

describe('LinkDefinition', () => {
  describe('.match', () => {
    let source;

    beforeEach(() => {
      source = '[foo]: http://www.example.com';
    });

    it('matches a link definition', () => {
      expect(LinkDefinition.match(source)).to.be.an.instanceof(LinkDefinition);
    });

    it('determines its label', () => {
      expect(LinkDefinition.match(source).label).to.eql('foo');
    });

    it('determines its URL', () => {
      expect(LinkDefinition.match(source).url).to.eql('http://www.example.com');
    });
  });
});
