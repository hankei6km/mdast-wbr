import { Readable, PassThrough } from 'stream'
import { cli } from '../src/cli.js'

describe('cli()', () => {
  // cli では for await..of で読んでいるので AsyncGenerator でも動く
  async function* mockStdin(md: string) {
    yield md
  }
  it('should print markdown word-breaked(html)', async () => {
    const stdin = mockStdin(
      '# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ'
    ) as unknown as Readable
    const stdout = new PassThrough()
    const stderr = new PassThrough()
    let outData = ''
    stdout.on('data', (d) => (outData = outData + d))
    let errData = ''
    stderr.on('data', (d) => (errData = errData + d))
    expect(
      await cli({
        locales: 'ja',
        asStr: '',
        stdin,
        stdout,
        stderr
      })
    ).toEqual(0)
    expect(outData).toMatchSnapshot()
    expect(errData).toEqual('')
  })

  it('should print markdown word-breaked(frontmatter)', async () => {
    const stdin = mockStdin(
      '---\nabc: 1\n---\n\n# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ'
    ) as unknown as Readable
    const stdout = new PassThrough()
    const stderr = new PassThrough()
    let outData = ''
    stdout.on('data', (d) => (outData = outData + d))
    let errData = ''
    stderr.on('data', (d) => (errData = errData + d))
    expect(
      await cli({
        locales: 'ja',
        asStr: '',
        stdin,
        stdout,
        stderr
      })
    ).toEqual(0)
    expect(outData).toMatchSnapshot()
    expect(errData).toEqual('')
  })

  it('should print markdown word-breaked(str)', async () => {
    const stdin = mockStdin(
      '# 単語の区切り **ここは強調** 続きの文字列\nここはパラグラフ'
    ) as unknown as Readable
    const stdout = new PassThrough()
    const stderr = new PassThrough()
    let outData = ''
    stdout.on('data', (d) => (outData = outData + d))
    let errData = ''
    stderr.on('data', (d) => (errData = errData + d))
    expect(
      await cli({
        locales: 'ja',
        asStr: '|',
        stdin,
        stdout,
        stderr
      })
    ).toEqual(0)
    expect(outData).toMatchSnapshot()
    expect(errData).toEqual('')
  })
})
