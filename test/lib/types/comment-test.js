import Comment    from '../../../lib/types/comment';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Comment', () => {
  describe('.matchMarkdown', () => {
    it('does not exist', () => {
      expect(Comment.matchMarkdown).to.be.null;
    });
  });

  describe('.matchNative', () => {
    let line;

    beforeEach(() => {
      line = Comment.matchNative(`${wrap('comment-theuser')}// Foo`);
    });

    it('matches a comment', () => {
      expect(line).to.be.an.instanceof(Comment);
    });

    it('determines its username', () => {
      expect(line.username).to.eql('theuser');
    });
  });

  describe('#toMarkdown', () => {
    it('does not exist', () => {
      expect(Comment.matchNative(`${wrap('comment-theuser')}// Foo`).toMarkdown)
        .to.be.null;
    });
  });

  describe('#toJSON', () => {
    it('returns its type, meta, and source', () => {
      const line = Comment.matchNative(`${wrap('comment-theuser')}// Foo`);
      expect(line.toJSON()).to.eql({
        content: '// Foo',
        type   : 'comment-item',
        meta   : {
          username: 'theuser'
        }
      });
    });
  });
});
