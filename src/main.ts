#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cli } from './cli.js'

const envVarsPrefix = process.env['MDAST_WBR_ENV_VARS_PREFIX'] || 'MDAST_WBR'

;(async () => {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('mdast-wbr')
    .env(envVarsPrefix)
    .usage('$0 [OPTIONS]... < markdown.md')
    .demand(0)
    .options({
      locales: {
        type: 'string',
        array: true,
        required: true,
        description: 'Locale strings to Intl.Segmenter'
      },
      'as-str': {
        type: 'string',
        array: false,
        required: false,
        description: 'The string used as <wbr> tag'
      }
    })
    .help().argv

  process.exit(
    await cli({
      locales: argv['locales'],
      asStr: argv['as-str'],
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr
    })
  )
})()
