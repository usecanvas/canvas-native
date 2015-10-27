# Canvas Native [![Circle CI](https://circleci.com/gh/usecanvas/canvas-native.svg?style=svg&circle-token=69d5436f464606a7de833acd870799390aef8fee)](https://circleci.com/gh/usecanvas/canvas-native)

Canvas Native is a set of utilities for parsing and converting between the
native Canvas format and other formats.

## Usage

Install `canvas-native` from npm:

```
npm i --save canvas-native
```

## Parsing

A canvas can be parsed from its native text form into an array of objects that
can then be converted into other formats:

```javascript
import { parse } from 'canvas-native/lib/parser';
parse(myCanvasString);
```

## Converting

A parsed canvas can be converted into other formats. The available converters
can be found in `lib/converters`:

```javascript
import { convert } from 'canvas-native/lib/converters/markdown';
import { parse   } from 'canvas-native/lib/parser';

const parsed   = parse(myCanvasString);
const markdown = convert(parsed);
```

## Creating Types

To create a new type, create a subclass of `lib/types/type` and add the missing
getters and methods (see that file for latest format):

```javascript
// lib/types/my-type.js

import Type     from './type';
import { wrap } from '../brackets';

export default class MyType extends Type {
  toMarkdown(/* prevLine, nextLine */) {
    return 'My type as Markdown';
  }

  static get name() {
    return 'my-type';
  }

  static get pattern() {
    return new RegExp(`^${wrap('my-type')}(.*)$`);
  }
}
```

### Prefixed Lines

In the above example, we make use of the `wrap` function exported from
`lib/brackets`. That function wraps a given string in the special brackets
used for parsing some lines in the Canvas native format.
