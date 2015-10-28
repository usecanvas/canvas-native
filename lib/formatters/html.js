import marked     from 'marked';
import toMarkdown from './markdown';

export default function format(native) {
  return marked(toMarkdown(native));
}
