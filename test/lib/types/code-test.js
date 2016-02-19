import Code       from '../../../lib/types/code';
import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Code', () => {
  describe('.match', () => {
    it('matches code', () => {
      const source = `${wrap('code')}Code`;
      expect(Code.match(source)).to.be.an.instanceof(Code);
    });

    it('matches code with a language', () => {
      const source = `${wrap('code-ruby')}Code`;
      expect(Code.match(source)).to.be.an.instanceof(Code);
    });
  });

  describe('.matchMarkdown', () => {
    it('matches code', () => {
      const source = 'Code';
      expect(Code.matchMarkdown(source, { groupType: 'code' }))
        .to.be.an.instanceof(Code);
    });

    it('ignores code not in a code group', () => {
      const source = 'Code';
      expect(Code.matchMarkdown(source)).to.be.null;
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = Code.match(wrap('code-ruby') + 'alert("ok");');
      expect(line.toJSON()).to.eql({
        type   : 'code',
        content: 'alert("ok");',
        meta   : { language: 'ruby' }
      });
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Code.match(wrap('code') + 'alert("ok");');
    });

    it('prepends a fence at the beginning of a code block', () => {
      expect(line.toMarkdown(Paragraph.match('Foo'), line))
        .to.eql('```\nalert("ok");');
    });

    it('prepends a fence with lang at the beginning of a code block', () => {
      line = Code.match(wrap('code-ruby') + 'alert("ok");');
      expect(line.toMarkdown(Paragraph.match('Foo'), line))
        .to.eql('```ruby\nalert("ok");');
    });

    it('prepends a fence at the beginning of a document', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('```\nalert("ok");');
    });

    it('appends a fence and new line at the end of a code block', () => {
      expect(line.toMarkdown(line, Paragraph.match('Foo')))
        .to.eql('alert("ok");\n```\n');
    });

    it('appends a fence and new line when followed by a different lang', () => {
      const line2 = Code.match(wrap('code-ruby') + 'alert("ok");');
      expect(line.toMarkdown(line, line2))
        .to.eql('alert("ok");\n```\n');
    });

    it('appends a fence at the end of a document', () => {
      expect(line.toMarkdown(line, null))
        .to.eql('alert("ok");\n```');
    });

    it('does not append a fence mid-block', () => {
      expect(line.toMarkdown(line, line))
        .to.eql('alert("ok");');
    });
  });
});
