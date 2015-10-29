import MarkdownIt from 'markdown-it';
import checkbox   from 'markdown-it-checkbox';
import toMarkdown from './markdown';

const renderer = new MarkdownIt({
  linkify: true,
}).use(checkbox);

export default function format(native) {
  return renderer.render(toMarkdown(native));
}

