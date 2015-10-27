import Checklist  from '../../../lib/types/checklist';
import Paragraph  from '../../../lib/types/paragraph';
import { expect } from 'chai';
import { wrap   } from '../../../lib/brackets';

describe('Checklist', () => {
  describe('.match', () => {
    let line, source;

    beforeEach(() => {
      source = `${wrap('checklist-1')}+ [x] Foo`;
      line   = Checklist.match(source);
    });

    it('matches a native UL line', () => {
      expect(line).to.be.an.instanceof(Checklist);
    });

    it('determines its level', () => {
      expect(line.level).to.eql(1);
    });

    it('determines its marker', () => {
      expect(line.marker).to.eql('+');
    });

    it('determines whether it is checked', () => {
      expect(line.isChecked).to.eql(true);
      const unchecked = source.replace('x', ' ');
      expect(Checklist.match(unchecked).isChecked).to.be.false;
    });
  });

  describe('#toMarkdown', () => {
    let line;

    beforeEach(() => {
      line = Checklist.match(wrap('checklist-0') + '- [ ] Foo');
    });

    it('reflects its nesting', () => {
      line = Checklist.match(wrap('checklist-1') + '- [ ] Foo');

      expect(line.toMarkdown(null, null))
        .to.eql('  - [ ] Foo');
    });

    it('appends a new line at the end of a list', () => {
      expect(line.toMarkdown(null, Paragraph.match('Foo')))
        .to.eql('- [ ] Foo\n');
    });

    it('does not append a new line at the end of the document', () => {
      expect(line.toMarkdown(null, null))
        .to.eql('- [ ] Foo');
    });

    it('does not append a new line mid-list', () => {
      expect(line.toMarkdown(null, line))
        .to.eql('- [ ] Foo');
    });
  });

  describe('#toJSON', () => {
    it('includes its checked status and level', () => {
      const line = Checklist.match(wrap('checklist-0') + '- [x] Foo');
      expect(line.toJSON()).to.eql({
        type   : 'checklist-item',
        content: '- [x] Foo',
        meta   : {
          level  : 0,
          checked: true,
        }
      });
    });
  });
});
