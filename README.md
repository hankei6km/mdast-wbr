# mdast-wbr

`mdast-wbr` uses `Intl.Segmenter` to split heading lines into words

- [Intl.Segmenter - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)

## Install

```sh
npm install mdast-qrcode
```

## Usage

code:

```ts
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { wbr } from './lib/wbr.js'

const tree = fromMarkdown(
  '# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ'
)
console.log(toMarkdown(wbr(tree, { locales: 'ja' })))
```

yield

```
# 単語<wbr>の<wbr>区切り<wbr> **ここは強調** <wbr>続き<wbr>の<wbr>文字<wbr>列

ここはパラグラフ
```

## API

### `wbr(tree, options)`

#### `options.locales`

Locales to `Intl.Segmenter`.

#### `options.segmenterOptions`

Options to `Intl.Segmenter`.

### `options.asStr`

The string used as `<wbr>` tag

## CLI

```console
$ echo -e "# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ" | mdast-wbr --locales ja

# 単語<wbr>の<wbr>区切り<wbr> **ここは強調** <wbr>続き<wbr>の<wbr>文字<wbr>列

ここはパラグラフ

$ echo -e "# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ" | mdast-wbr --locales ja  --as-str "|"

# 単語|の|区切り| **ここは強調** |続き|の|文字|列

ここはパラグラフ

```

## License

MIT License

Copyright (c) 2022 hankei6km
