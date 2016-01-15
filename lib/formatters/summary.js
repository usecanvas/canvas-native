import Scanner from '../scanner';
import stripMd from 'remove-markdown';

const MAX_LENGTH = 256;

/**
 * @module Formatters.Summary

/**
 * Format a CanvasNative document as a summary.
 *
 * @static
 * @param {string} native A CanvasNative string
 * @return {string} The summarized CanvasNative string
 */
export default function format(native) {
  let result    = '';
  const scanner = new Scanner(native);

  for (const [, current] of scanner) {
    if (result.length >= 256) {
      break;
    }

    if (!current.isSummarized) {
      continue;
    }

    const nextContent = current.content.trim();

    if (!nextContent) {
      continue;
    }

    let next = stripMd(nextContent);
    if (!/[.?!]$/.test(next)) {
      next = `${next}. `;
    } else {
      next = `${next} `;
    }

    if (next.length + result.length > 256) {
      const nextParts = next.split(/\W/);

      for (const part of nextParts) {
        if (part.length + result.length <= 256) {
          result += part + ' ';
        } else {
          break;
        }
      }

      result = result.trim() + '. ';

      break;
    } else {
      result += next;
    }
  }

  return result.trim();
}
