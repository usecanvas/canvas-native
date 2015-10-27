import Code       from '../../../lib/types/code';
import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Code', () => {
  describe('.match', () => {
    it('matches a normal text line', () => {
      const source = `${wrap('code')}Code`;
      expect(Code.match(source)).to.be.an.instanceof(Code);
    });
  });

  describe('#toJSON', () => {
    it('serializes to JSON', () => {
      const line = Code.match(wrap('code') + 'alert("ok");');
      expect(line.toJSON()).to.eql({
        type   : 'code',
        content: 'alert("ok");',
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

    it('prepends a fence at the beginning of a document', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('```\nalert("ok");');
    });

    it('appends a fence and new line at the end of a code block', () => {
      expect(line.toMarkdown(line, Paragraph.match('Foo')))
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
