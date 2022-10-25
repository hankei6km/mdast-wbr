import type { Text, HTML, PhrasingContent } from 'mdast'
import { WbrOptions } from './types.js'

export function breakNodeMaker(opts: WbrOptions): () => Text | HTML {
  const asStr = opts.asStr
  return typeof asStr === 'string' && asStr !== ''
    ? function breakNode(): Text | HTML {
        return { type: 'text', value: asStr }
      }
    : function breakNode(): Text | HTML {
        return { type: 'html', value: '<wbr>' }
      }
}

export function wbrPhrasingContents(
  segmenter: Intl.Segmenter,
  opts: WbrOptions,
  children: PhrasingContent[]
): PhrasingContent[] {
  const ret: PhrasingContent[] = []
  const breakNode = breakNodeMaker(opts)
  for (const c of children) {
    if (c.type === 'text' && c.value !== '') {
      const segment = [...segmenter.segment(c.value)]
      ret.push({ type: 'text', value: segment[0].segment })
      for (const s of segment.slice(1)) {
        ret.push(breakNode())
        ret.push({ type: 'text', value: s.segment })
      }
    } else {
      ret.push(c)
    }
  }
  return ret
}
