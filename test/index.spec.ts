import * as index from '../src/index.js'
import type { WbrOptions } from '../src/index.js'
import { wbr } from '../src/lib/wbr'

describe('index.ts', () => {
  it('should export modules', async () => {
    expect(index.wbr).toEqual(wbr)
  })
})
