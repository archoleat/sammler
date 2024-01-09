import PATHS from '../settings/paths.js'

import PROJECT_CONFIG from './project.config.js'

const {
  html: {
    version: { assets, format }
  }
} = PROJECT_CONFIG
const { versionFile } = PATHS

const versionNumberConfig = {
  value: format ?? '%DT%',
  append: {
    key: 'v',
    cover: 0,
    to: ['css', 'js', ...assets ?? []]
  },
  output: {
    file: versionFile
  }
}

export default versionNumberConfig
