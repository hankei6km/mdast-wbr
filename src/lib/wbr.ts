import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'
import { WbrOptions } from './types.js'
import { wbrPhrasingContents } from './break.js'

export function normalizeWbrOptions(opts: WbrOptions): WbrOptions {
  const segmenterOptions: Intl.SegmenterOptions = Object.assign(
    {},
    opts.segmenterOptions || {},
    { granularity: 'word' }
  )
  return Object.assign({}, opts, { segmenterOptions })
}

export function wbr(tree: Root, inOpts: WbrOptions): Root {
  const opts = normalizeWbrOptions(inOpts)
  const segmenter = new Intl.Segmenter(opts.locales, opts.segmenterOptions)

  visit(tree, 'heading' as const, (node, index, parent) => {
    if (typeof index === 'number' && parent?.type === 'root') {
      node.children = wbrPhrasingContents(segmenter, opts, node.children)
      // return 'skip'
    }
  })

  return tree
}
