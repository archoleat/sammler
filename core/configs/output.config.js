import PATHS from '../settings/paths.js'

import PROJECT_CONFIG from './project.config.js'

const { buildFolder } = PATHS
const {
  server: { publicPath }
} = PROJECT_CONFIG

const outputConfig = (fileName) => {
  return {
    publicPath,
    filename: fileName,
    path: buildFolder
  }
}

export default outputConfig
