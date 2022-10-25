import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { normalizeWbrOptions, wbr } from '../../src/lib/wbr.js'

describe('normalizeWbrOptions()', () => {
  it('should normalized options', () => {
    expect(normalizeWbrOptions({ locales: 'ja' })).toEqual({
      locales: 'ja',
      segmenterOptions: { granularity: 'word' }
    })
    expect(
      normalizeWbrOptions({
        locales: 'ja',
        segmenterOptions: { localeMatcher: 'lookup' }
      })
    ).toEqual({
      locales: 'ja',
      segmenterOptions: { granularity: 'word', localeMatcher: 'lookup' }
    })
  })
  it('should use "word" to granularity field', () => {
    expect(
      normalizeWbrOptions({
        locales: 'ja',
        segmenterOptions: { granularity: 'sentence' }
      })
    ).toEqual({
      locales: 'ja',
      segmenterOptions: { granularity: 'word' }
    })
  })
})

describe('wbr()', () => {
  it('should return tree word-breaked', () => {
    const tree = fromMarkdown(
      '# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ'
    )
    expect(toMarkdown(wbr(tree, { locales: 'ja' }))).toEqual(
      '# 単語<wbr>の<wbr>区切り<wbr> **ここは強調** <wbr>続き<wbr>の<wbr>文字<wbr>列\n\nここはパラグラフ\n'
    )
  })
})
