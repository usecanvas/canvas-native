import marked                    from 'marked';
import { convert as toMarkdown } from './markdown';

export function convert(native) {
  return marked(toMarkdown(native));
}
