import PATHS from '../settings/paths.js'

import projectConfig from './project.config.js'

const { buildFolder } = PATHS
const {
  server: { publicPath }
} = projectConfig

const outputConfig = (fileName) => {
  return {
    publicPath,
    filename: fileName,
    path: buildFolder
  }
}

export default outputConfig
