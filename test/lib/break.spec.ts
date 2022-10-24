import type { PhrasingContent } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { breakNodeMaker, wbrPhrasingContents } from '../../src/lib/break.js'

describe('breakNodeMaker()', () => {
  it('should make HTML node', () => {
    expect(breakNodeMaker({ locales: 'ja' })()).toEqual({
      type: 'html',
      value: '<wbr>'
    })
  })
})

describe('wbrPhrasingContents()', () => {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'word' })
  const headingContent: (md: string) => PhrasingContent[] = (md: string) => {
    const tree = fromMarkdown(md)
    if (tree.children[0].type === 'heading') {
      return tree.children[0].children
    }
    return []
  }
  const toHeadingMd: (childre: PhrasingContent[]) => string = (
    children: PhrasingContent[]
  ) =>
    toMarkdown({
      type: 'root',
      children: [{ type: 'heading', depth: 1, children }]
    }).replace(/\n$/, '')

  it('should return break word by HTML node', () => {
    const children = wbrPhrasingContents(
      segmenter,
      { locales: 'ja' },
      headingContent('# 単語の区切り **ここは強調** 続きの文字列')
    )
    expect(toHeadingMd(children)).toEqual(
      '# 単語<wbr>の<wbr>区切り<wbr> **ここは強調** <wbr>続き<wbr>の<wbr>文字<wbr>列'
    )
  })
})
