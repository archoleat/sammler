import PATHS from '../settings/paths.js'

import projectConfig from './project.config.js'

const {
  html: {
    version: { assets, format }
  }
} = projectConfig
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
