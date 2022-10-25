import { Readable, Writable } from 'node:stream'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { frontmatter } from 'micromark-extension-frontmatter'
import {
  frontmatterFromMarkdown,
  frontmatterToMarkdown
} from 'mdast-util-frontmatter'
import { WbrOptions } from './lib/types.js'
import { wbr } from './lib/wbr.js'

type Opts = {
  stdin: Readable
  stdout: Writable
  stderr: Writable
} & Pick<WbrOptions, 'locales' | 'asStr'>

export const cli = async ({
  locales,
  asStr,
  stdin,
  stdout,
  stderr
}: Opts): Promise<number> => {
  try {
    let md = ''
    for await (const i of stdin) {
      md = md + i.toString('utf-8')
    }
    const tree = fromMarkdown(md, {
      extensions: [frontmatter(['yaml', 'toml'])],
      mdastExtensions: [frontmatterFromMarkdown(['yaml', 'toml'])]
    })
    stdout.write(
      toMarkdown(wbr(tree, { locales, asStr }), {
        extensions: [frontmatterToMarkdown(['yaml', 'toml'])]
      })
    )
  } catch (err: any) {
    stderr.write(err.toString())
    stderr.write('\n')
    return 1
  }
  return 0
}
